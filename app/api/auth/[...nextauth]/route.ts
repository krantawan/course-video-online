import { PrismaClient, User } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt, { compare } from "bcrypt";

import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (
          user &&
          user.password && // ตรวจสอบว่า user.password ไม่เป็น null
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id + "",
            name: user.name,
            email: user.email,
            role: user.role, // เพิ่ม role // แล้วส่งต่อไปที่ jwt
          };
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      // jwt user ที่ส่งต่อมา สามารถนำมาใส่ token ได้
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: user.id,
          role: u.role,
        };
      }
      return token;
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },

  pages: {
    signIn: "/admin",
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
