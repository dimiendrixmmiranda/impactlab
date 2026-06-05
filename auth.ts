import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } =
    NextAuth({
        providers: [
            Credentials({
                credentials: {
                    email: {},
                    password: {}
                },

                async authorize(credentials) {

                    const user =
                        await prisma.user.findUnique({
                            where: {
                                email: credentials?.email as string
                            }
                        });

                    if (!user) {
                        return null;
                    }

                    const senhaCorreta =
                        await bcrypt.compare(
                            credentials?.password as string,
                            user.senha
                        );

                    if (!senhaCorreta) {
                        return null;
                    }

                    return {
                        id: user.id,
                        name: user.nome,
                        email: user.email
                    };
                }
            })
        ],

        session: {
            strategy: "jwt"
        },

        secret: process.env.AUTH_SECRET
    })