import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null
                const user = await prisma.user.findUnique({ where: { email: credentials.email as string } })
                if (!user || !user.password) return null
                const isValid = await compare(credentials.password as string, user.password)
                if (!isValid) return null
                return { id: user.id, name: user.name, email: user.email, image: user.image }
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
    },
})