import type { Task } from '../models/Task';

export class TaskFactory {
  static createTask(title: string): Task {
    return {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
  }
}
