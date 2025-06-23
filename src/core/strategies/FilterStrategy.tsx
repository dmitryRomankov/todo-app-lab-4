import type { Task } from '../../models/Task';

export interface FilterStrategy {
  filter(tasks: Task[]): Task[];
}

export class AllStrategy implements FilterStrategy {
  filter(tasks: Task[]) {
    return tasks;
  }
}

export class ActiveStrategy implements FilterStrategy {
  filter(tasks: Task[]) {
    return tasks.filter((t) => !t.completed);
  }
}

export class CompletedStrategy implements FilterStrategy {
  filter(tasks: Task[]) {
    return tasks.filter((t) => t.completed);
  }
}
