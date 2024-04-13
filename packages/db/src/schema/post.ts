import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const post = sqliteTable("post", {
  id: text("id").primaryKey(),
  title: text("name").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
