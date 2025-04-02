import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, getServerSession, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import { compare } from "bcryptjs"

type Role = 'admin' | 'xpro' | 'sponsor' | 'player'

declare module "next-auth" {
  interface User {
    id: string
    email: string | null
    name: string | null
    role: Role
    isAdmin: boolean
  }
  
  interface Session {
    user: User & {
      id: string
      email: string | null
      name: string | null
      role: Role
      isAdmin: boolean
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            return null;
          }

          const isPasswordValid = await compare(credentials.password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          const role = user.role as Role;
          const isAdmin = role === 'admin';

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role,
            isAdmin
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as Role;
        session.user.email = token.email as string | null;
        session.user.name = token.name as string | null;
        session.user.isAdmin = token.role === 'admin';
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.isAdmin = user.role === 'admin';
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
}

export const auth = () => getServerSession(authOptions) 