import { Context } from "hono";
import { type AuthConfig } from "@hono/auth-js"
import GitHub from "@auth/core/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getPrisma } from "./prisma";


export default function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    adapter: PrismaAdapter(getPrisma(c.env.DATABASE_URL)),
    providers: [
      GitHub({
        clientId: c.env.GITHUB_ID,
        clientSecret: c.env.GITHUB_SECRET
      }),
    ]
  }
}