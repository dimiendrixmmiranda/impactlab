import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            nome,
            email,
            senha,
            sexo,
            imagem
        } = body;

        if (!nome || !email || !senha) {
            return NextResponse.json(
                { error: "Preencha todos os campos" },
                { status: 400 }
            );
        }

        const usuarioExistente =
            await prisma.user.findUnique({
                where: {
                    email
                }
            });

        if (usuarioExistente) {
            return NextResponse.json(
                { error: "Email já cadastrado" },
                { status: 400 }
            );
        }

        const senhaHash =
            await bcrypt.hash(senha, 10);

        await prisma.user.create({
            data: {
                nome,
                email,
                senha: senhaHash,
                sexo, 
                imagem
            }
        });

        return NextResponse.json({
            success: true
        });

    } catch {
        return NextResponse.json(
            { error: "Erro interno" },
            { status: 500 }
        );
    }
}