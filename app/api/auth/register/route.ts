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
            dataNascimento,
            instituicao,
            localizacao,
            bio,
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
                imagem: `${sexo == 'masculino' ? '/users/usuario-masculino.png': '/users/usuario-feminino.png'}`,
                dataNascimento: dataNascimento
                    ? new Date(dataNascimento)
                    : null,
                instituicao: instituicao || '',
                localizacao: localizacao || '',
                bio: bio || '',
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