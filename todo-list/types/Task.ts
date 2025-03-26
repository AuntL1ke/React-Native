// === 📁 src/types/Task.ts ===
export type Priority = 'low' | 'mid' | 'high';
export type Status = 'to-do' | 'done';

export interface Task {
  id: string;
  title: string;
  date: string;
  priority: Priority;
  status: Status;
}
