import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.server";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { PrismaClient } from "@prisma/client";
import { createAuthMiddleware } from "better-auth/api";


if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set");
}

export const auth = betterAuth({
  secret: process.env.SESSION_SECRET,
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
