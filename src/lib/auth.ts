import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, getServerSession, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db"
import { compare } from "bcryptjs"
import GoogleProvider from "next-auth/providers/google"

type Role = 'admin' | 'xpro' | 'sponsor' | 'player' | 'coach'

declare module "next-auth" {
  interface User {
    id: string
    email: string | null
    name: string | null
    role: Role
    isAdmin: boolean
    isVerifiedCoach: boolean
  }
  
  interface Session {
    user: User & {
      id: string
      email: string | null
      name: string | null
      role: Role
      isAdmin: boolean
      isVerifiedCoach: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name: string | null
    email: string | null
    picture: string | null
    role: Role
    isAdmin: boolean
    isVerifiedCoach: boolean
  }
}

// Ensure NEXTAUTH_URL is valid
const getBaseUrl = () => {
  if (process.env.NEXTAUTH_URL) {
    try {
      return new URL(process.env.NEXTAUTH_URL).origin;
    } catch {
      console.warn('Invalid NEXTAUTH_URL, falling back to default');
    }
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return 'http://localhost:3000';
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
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
          const user = await db.user.findUnique({
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
            isAdmin,
            isVerifiedCoach: user.isVerifiedCoach
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
        session.user.role = token.role as Role;
        session.user.isVerifiedCoach = token.isVerifiedCoach as boolean;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email ?? '',
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }

      return {
        ...token,
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role as Role,
        isVerifiedCoach: dbUser.isVerifiedCoach
      };
    },
  },
  session: {
    strategy: "jwt",
  },
}

// Use the base URL in your configuration
export const baseUrl = getBaseUrl();

export const auth = () => getServerSession(authOptions) 