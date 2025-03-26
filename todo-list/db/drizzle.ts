import * as SQLite from 'expo-sqlite';

import { drizzle } from 'drizzle-orm/expo-sqlite';
import { sql } from 'drizzle-orm';

const expoDb = SQLite.openDatabaseSync('tasks.db'); // ✅ Працює з expo-sqlite
export const db = drizzle(expoDb);

export async function initDb() {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      priority TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `);
}
