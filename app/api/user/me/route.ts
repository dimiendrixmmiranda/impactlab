import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json(null);
    }

    const usuario = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    return NextResponse.json(usuario);
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const {
            nome,
            email,
            dataNascimento,
            instituicao,
            localizacao,
            bio,
            imagem,
            senha,
            novaSenha,
        } = body;

        const usuario = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!usuario) {
            return NextResponse.json(
                { error: "Usuário não encontrado" },
                { status: 404 }
            );
        }

        let senhaHash = usuario.senha;

        if (novaSenha) {
            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaCorreta) {
                return NextResponse.json(
                    { error: "Senha atual incorreta" },
                    { status: 400 }
                );
            }

            senhaHash = await bcrypt.hash(
                novaSenha,
                10
            );
        }

        const usuarioAtualizado =
            await prisma.user.update({
                where: {
                    id: usuario.id,
                },
                data: {
                    nome,
                    email,
                    imagem,
                    senha: senhaHash,
                    dataNascimento: dataNascimento
                        ? new Date(dataNascimento)
                        : null,
                    instituicao,
                    localizacao,
                    bio,
                },
            });

        return NextResponse.json(
            usuarioAtualizado
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Erro interno" },
            { status: 500 }
        );
    }
}