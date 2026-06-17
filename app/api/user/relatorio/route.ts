import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return NextResponse.json(
            { erro: "Não autorizado" },
            { status: 401 }
        )
    }

    const usuario = await prisma.user.update({
        where: {
            email: session.user.email
        },
        data: {
            qtdeRelatorios: {
                increment: 1
            }
        }
    })

    return NextResponse.json(usuario)
}