import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import uniqueId from '../utils/uniqueId';

export interface Task {
  id: string;
  status: string;
  title: string;
}

interface TaskStore {
  tasks: Task[];
  createTask: (title: string) => void;
  completeTask: (id: string) => void;
  activateTask: (id: string) => void;
  clearCompletedTask: () => void;
}

const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        createTask: (title) =>
          set((state) => {
            const newTask = {
              id: uniqueId(),
              status: 'active',
              title,
            };
            return {
              tasks: [newTask, ...state.tasks],
            };
          }),
        completeTask: (id) =>
          set((state) => ({
            tasks: state.tasks.map((task) => ({
              ...task,
              status: task.id === id ? 'completed' : task.status,
            })),
          })),
        activateTask: (id) =>
          set((state) => ({
            tasks: state.tasks.map((task) => ({
              ...task,
              status: task.id === id ? 'active' : task.status,
            })),
          })),
        clearCompletedTask: () =>
          set((state) => ({
            tasks: state.tasks.filter((task) => task.status === 'active'),
          })),
      }),
      {
        name: 'tasks',
      },
    ),
  ),
);

export default useTaskStore;
