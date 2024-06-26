import type { Config } from "drizzle-kit";
import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
  server: {
    DB_CONNECTION_URL: z.string(),
    DB_TOKEN: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

// Push requires SSL so use URL instead of username/password

export default {
  schema: "./src/schema",
  driver: "turso",
  dbCredentials: { url: env.DB_CONNECTION_URL, authToken: env.DB_TOKEN },
  tablesFilter: ["t3turbo_*"],
} satisfies Config;
