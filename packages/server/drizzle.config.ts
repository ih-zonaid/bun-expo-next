import type { Config } from "drizzle-kit";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) throw new Error("TURSO_DATABASE_URL is not defined");

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "turso",
  dbCredentials: {
    url,
    authToken,
  },
} satisfies Config;
