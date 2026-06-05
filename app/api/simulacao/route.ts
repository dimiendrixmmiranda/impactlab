import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {

    const session =
        await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json(
            { error: "Não autenticado" },
            { status: 401 }
        );
    }

    const body = await req.json();

    const usuario =
        await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

    if (!usuario) {
        return NextResponse.json(
            { error: "Usuário não encontrado" },
            { status: 404 }
        );
    }

    const simulacao =
        await prisma.simulation.create({
            data: {
                material: body.material,
                energia: body.energia,
                momento: body.momento,
                impacto: body.impacto,
                area: body.area,
                tensao: body.tensao,
                integridade: body.integridade,
                status: body.status,
                corStatus: body.corStatus,
                userId: usuario.id
            }
        });
    return NextResponse.json(simulacao);
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

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

        const simulacoes = await prisma.simulation.findMany({
            where: {
                userId: usuario.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(simulacoes);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Erro ao buscar simulações" },
            { status: 500 }
        );
    }
}