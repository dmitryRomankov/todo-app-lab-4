import type { Task } from '../models/Task';

type Listener = () => void;

class TaskStore {
  private tasks: Task[] = [];
  private listeners: Listener[] = [];

  private static instance: TaskStore;

  private constructor() {}

  static getInstance(): TaskStore {
    if (!TaskStore.instance) {
      TaskStore.instance = new TaskStore();
    }
    return TaskStore.instance;
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  getTasks() {
    return [...this.tasks];
  }

  add(task: Task) {
    this.tasks.push(task);
    this.notify();
  }

  toggle(id: string) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.notify();
    }
  }

  remove(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.notify();
  }
}

export const taskStore = TaskStore.getInstance();
