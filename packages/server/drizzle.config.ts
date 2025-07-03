import { type Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["web_*"],
} satisfies Config;
