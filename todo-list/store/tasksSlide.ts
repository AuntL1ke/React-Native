// === 📁 src/store/tasksSlice.ts ===
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/Task';

interface State {
  tasks: Task[];
}

const initialState: State = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    markDone(state, action: PayloadAction<string>) {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.status = 'done';
    },
  },
});

export const { addTask, deleteTask, markDone } = tasksSlice.actions;
export default tasksSlice.reducer;
