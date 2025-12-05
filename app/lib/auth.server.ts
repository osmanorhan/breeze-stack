import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.server";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { PrismaClient } from "@prisma/client";
import { createAuthMiddleware } from "better-auth/api";

const authSecret = (process.env.BETTER_AUTH_SECRET ?? process.env.SESSION_SECRET ?? "").trim();

if (authSecret.length < 32) {
  throw new Error(
    "BETTER_AUTH_SECRET must be at least 32 characters. Set BETTER_AUTH_SECRET or SESSION_SECRET to a secure value."
  );
}

export const auth = betterAuth({
  secret: authSecret,
  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: { 
    enabled: true, 
  }, 
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: false,
  }
},
  debug: true // Enable debugging in development

});
