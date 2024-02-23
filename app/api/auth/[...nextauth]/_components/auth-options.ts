import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthOptions } from "next-auth";
import { AuthUser } from "@/types/typings";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            (credentials as any).email || "",
            (credentials as any).password || ""
          );

          if (user) {
            return {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            } satisfies AuthUser;
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
        token.uid = user.uid;
        token.email = user.email;
        token.displayName = user.displayName;
        token.photoURL = user.photoURL;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.uid = token.uid;
        session.user.email = token.email !== undefined ? token.email : null;
        session.user.displayName = token.displayName;
        session.user.photoURL = token.photoURL;
      }

      return session;
    },
  },
};
