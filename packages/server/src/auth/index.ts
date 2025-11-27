import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"; // your drizzle instance
import { expo } from "@better-auth/expo";
import { oAuthProxy } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    expo(),
    oAuthProxy({
      productionURL: "https://bun-expo-next-web.vercel.app",
      // currentURL is auto-detected from the request - no need to specify
    }),
  ],
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: [
    "myapp://",
    "http://localhost:8081",
    "http://localhost:3000",
    "exp://192.168.0.120:8081/--/", // Sometimes this pattern mattchign don't work in Expo Dev Client
    ...(process.env.NODE_ENV === "development"
      ? [
          "exp://*/*", // Trust all Expo development URLs
          "exp://10.0.0.*:*/*", // Trust 10.0.0.x IP range
          "exp://192.168.*.*:*/*", // Trust 192.168.x.x IP range
          "exp://172.*.*.*:*/*", // Trust 172.x.x.x IP range
          "exp://localhost:*/*", // Trust localhost
        ]
      : []),
  ],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "None", // Use "None" for cross-origin
      secure: true,
      // httpOnly: true,
      // path: "/",
      // partitioned: true, // New browser standards will mandate this for foreign cookies
    },
  },
});
