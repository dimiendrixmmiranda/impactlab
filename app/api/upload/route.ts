import cloudinary from "@/lib/cloudinary";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json(
            { error: "Não autorizado" },
            { status: 401 }
        );
    }

    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { error: "Arquivo não enviado" },
            { status: 400 }
        );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: any = await new Promise(
        (resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "impactlab/perfis",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                )
                .end(buffer);
        }
    );

    const usuario = await prisma.user.update({
        where: {
            email: session.user.email,
        },
        data: {
            imagem: result.secure_url,
        },
    });

    return NextResponse.json(usuario);
}