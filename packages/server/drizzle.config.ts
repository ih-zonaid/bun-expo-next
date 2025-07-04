import { type Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  tablesFilter: ["web_*"],
} satisfies Config;
