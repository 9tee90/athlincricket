import NextAuth from "next-auth"
import { compare } from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import type { User } from "next-auth"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error("Invalid credentials")
        }

        const isValid = await compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isAdmin: user.role === 'admin',
          isVerifiedCoach: user.isVerifiedCoach
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.isAdmin = user.role === 'admin'
        token.isVerifiedCoach = user.isVerifiedCoach
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.isAdmin = token.role === 'admin'
        session.user.isVerifiedCoach = token.isVerifiedCoach
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
})

export { handler as GET, handler as POST } 