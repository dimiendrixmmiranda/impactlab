import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function DELETE(
    req: Request,
    { params }: Props
) {
    try {
        const { id } = await params;

        await prisma.simulation.delete({
            where: {
                id
            }
        });

        return NextResponse.json({
            message: "Simulação excluída com sucesso."
        });
    } catch {
        return NextResponse.json(
            { error: "Erro ao excluir simulação." },
            { status: 500 }
        );
    }
}