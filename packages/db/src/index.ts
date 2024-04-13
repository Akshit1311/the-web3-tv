import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "./config";
import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/mysql-core";

const client = createClient({
  url: env.DB_CONNECTION_URL,
  authToken: env.DB_TOKEN,
});

export const db = drizzle(client, { schema });
