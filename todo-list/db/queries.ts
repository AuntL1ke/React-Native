// === 📁 src/db/queries.ts ===
import { db } from './drizzle';
import { tasks } from './schema';
import { Task } from '../types/Task';

export async function addTaskToDb(task: Task) {
  await db.insert(tasks).values(task).run();
}

export async function getTasksFromDb(): Promise<Task[]> {
  const result = await db.select().from(tasks).all();
  return result;
}

export async function deleteTaskFromDb(id: string) {
  await db.delete(tasks).where(tasks.id.eq(id)).run();
}
