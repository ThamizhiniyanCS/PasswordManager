import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { ZodUserSchema } from "./lib/zodDefinitions";
import { getUser } from "./lib/fetchData";
import bcrypt from "bcrypt";

const authSchema = ZodUserSchema.omit({ name: true });

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = authSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email_id, password } = parsedCredentials.data;
          const user = await getUser(email_id);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
          return user as any;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
