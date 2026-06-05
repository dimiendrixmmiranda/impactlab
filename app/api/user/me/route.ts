import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
        return
    }

    const usuario =
        await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

    return NextResponse.json(usuario);
}