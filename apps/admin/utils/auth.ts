import { type GetServerSidePropsContext } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  prisma from "./prisma";
import bcrypt from 'bcrypt'
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: any;
      firstName: any;
      lastName: any;
      email?: string | null;
      password:string
    } & DefaultSession["user"];
  }

  interface User {
    user_first_name: string;
    user_last_name: string;
    user_id: string;
    user_email: string;
    password_hash: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.firstName = user.user_first_name;
        token.lastName = user.user_last_name;
        token.email = user.email;
        token.id = user.id;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      session.user.id = token.id;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/auth/sign-in",
    // error: "/auth/error",  Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request",  (used for check email message)
  },
  providers: [
    CredentialsProvider({
      name: "password",
      credentials: {
        user_email: {},
        password_hash: {},
      },
      authorize: async (credentials, req) => {
        if (!credentials?.user_email || !credentials.password_hash) return null;

        const user: any = await prisma.user.findFirst({
          where: {
            user_email: {
              equals: credentials?.user_email,
              mode: "insensitive",
            },
          },
        });
        if (user) {
          const passwordMatch = await bcrypt.compare(
            credentials?.password_hash,
            user.password_hash
          );
          if (!passwordMatch) {
            return null;
          }
          return user;
        }
        return null;
      },
    }),
  

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};