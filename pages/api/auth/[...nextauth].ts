import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import prisma from "@/libs/prismadb"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // console.log('Received credentials:', credentials);
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Geçersiz email veya şifre");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    console.log("Kullanıcı bulunamadı: ", credentials.email);
                    throw new Error("Geçersiz email veya şifre");
                }

                if (!user.hashedPassword) {
                    console.log("Kullanıcı şifresi bulunamadı: ", credentials.email);
                    throw new Error("Geçersiz email veya şifre");
                }

                const comparePassword = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!comparePassword) {
                    console.log("Yanlış şifre: ", credentials.email);
                    throw new Error("Yanlış parola");
                }

                return user;
            }
        }),
    ],
    pages: {
        signIn: "/login"
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions);
