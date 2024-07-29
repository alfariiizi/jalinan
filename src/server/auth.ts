import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    // ...other properties
    // role: UserRole;
  }

  interface JWT {
    id: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    // Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const user = await db.user.findUnique({
            where: {
              ...(email.includes("@")
                ? {
                    email,
                  }
                : {
                    username: email,
                  }),
            },
          });

          // Fetch user and password hash from your database
          // Example: const user = await getUserByEmail(email)
          if (user && bcrypt.compareSync(password, user.passwordHash)) {
            return { id: user.id, name: user.name, email: user.email };
          } else {
            // throw new Error("Invalid credentials");
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  callbacks: {
    signIn: ({ user }) => {
      if (user) return true;
      return false;
    },
    jwt: ({ token, user }) => {
      return {
        ...token,
        ...user,
      };
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: token.name,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  // debug: env.NODE_ENV === "development",
});

// --> this is for Lucia <--

// import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
// import { Lucia, type User, type Session } from "lucia";
// import { db } from "./db";
// import { cache } from "react";
// import { cookies } from "next/headers";
//
// const adapter = new PrismaAdapter(db.session, db.user); // your adapter
//
// export const lucia = new Lucia(adapter, {
//   sessionCookie: {
//     // this sets cookies with super long expiration
//     // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
//     expires: false,
//     attributes: {
//       // set to `true` when using HTTPS
//       secure: process.env.NODE_ENV === "production",
//     },
//   },
//   getUserAttributes(databaseUserAttributes) {
//     return {
//       id: databaseUserAttributes.id,
//       username: databaseUserAttributes.username,
//       displayName: databaseUserAttributes.displayName,
//       avatarUrl: databaseUserAttributes.avatarUrl,
//       googleId: databaseUserAttributes.googleId,
//     };
//   },
// });
//
// // IMPORTANT!
// declare module "lucia" {
//   interface Register {
//     Lucia: typeof lucia;
//     DatabaseUserAttributes: DatabaseUserAttributes;
//   }
// }
//
// interface DatabaseUserAttributes {
//   id: string;
//   username: string;
//   displayName: string;
//   avatarUrl: string | null;
//   googleId: string | null;
// }
//
// export const validateRequest = cache(
//   async (): Promise<
//     { user: User; session: Session } | { user: null; session: null }
//   > => {
//     const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
//     if (!sessionId) {
//       return {
//         user: null,
//         session: null,
//       };
//     }
//
//     const result = await lucia.validateSession(sessionId);
//
//     try {
//       if (result.session && result.session.fresh) {
//         const sessionCookie = lucia.createSessionCookie(result.session.id);
//         cookies().set(
//           sessionCookie.name,
//           sessionCookie.value,
//           sessionCookie.attributes,
//         );
//       }
//     } catch (error) {}
//
//     return result;
//   },
// );
