// === 📁 src/db/schema.ts ===
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  date: text('date').notNull(),
  priority: text('priority').notNull(),
  status: text('status').notNull(),
});