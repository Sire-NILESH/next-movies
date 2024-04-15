import {
  compareHashedPassword,
  getUserByEmailAction,
} from "@/lib/actions/authActions";
import db from "@/lib/db/prisma";
import { SignInSchema } from "@/lib/validation-schemas";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.

    // Note:
    // The Credentials Provider can only be used if JSON Web Tokens are used for sessions.

    // JSON Web Tokens are used for Sessions by default if you have not specified a database. However, if you are using a database, then Database Sessions are enabled by default and you need to explicitly enable JWT Sessions to use the Credentials Provider.

    // If you are using a Credentials Provider, NextAuth.js will not persist users or sessions in a database - user accounts used with the Credentials Provider must be created and managed outside of NextAuth.js.
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        //   email: { type: "email", placeholder: "Your email address" },
        //   password: { type: "string", placeholder: "******" },
      },
      async authorize(credentials): Promise<any> {
        try {
          const parsed = SignInSchema.safeParse(credentials);

          if (!parsed.success) return null;

          const existingUser = await getUserByEmailAction(parsed.data.email);

          if (existingUser.error || !existingUser.data) return null;

          const passwordsMatch = await compareHashedPassword(
            parsed.data.password,
            existingUser.data.password
          );

          if (passwordsMatch) {
            return {
              id: existingUser.data.id,
              name: existingUser.data.name,
              email: existingUser.data.email,
              emailVerified: existingUser.data.emailVerified,
              image: existingUser.data.image,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image === undefined ? null : user.image;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email === undefined ? null : token.email;
        session.user.name = token.name! === undefined ? null : token.name;
        session.user.image = token.image;
      }

      return session;
    },
  },
};
