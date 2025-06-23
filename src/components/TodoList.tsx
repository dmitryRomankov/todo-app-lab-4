import { useCallback, useEffect, useState } from 'react';
import type { Task } from '../models/Task';
import { taskStore } from '../core/TaskStore';
import { TodoItem } from './TodoItem';
import { TaskFactory } from '../core/TaskFactory';
import {
  AllStrategy,
  ActiveStrategy,
  CompletedStrategy,
  type FilterStrategy,
} from '../core/strategies/FilterStrategy';
import { commandManager } from '../core/commands/CommandManager';
import { Modal } from './modal/Modal';

export const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterStrategy>(new AllStrategy());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateTasks = useCallback(() => {
    const allTasks = taskStore.getTasks();
    setTasks(filter.filter(allTasks));
  }, [filter]);

  useEffect(() => {
    taskStore.subscribe(updateTasks);
    updateTasks();

    const filterHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      switch (detail) {
        case 'all':
          setFilter(new AllStrategy());
          break;
        case 'active':
          setFilter(new ActiveStrategy());
          break;
        case 'completed':
          setFilter(new CompletedStrategy());
          break;
      }
    };
    window.addEventListener('setFilter', filterHandler);

    return () => {
      window.removeEventListener('setFilter', filterHandler);
    };
  }, [updateTasks]);

  useEffect(() => {
    updateTasks();
  }, [filter, updateTasks]);

  const handleAdd = (title: string) => {
    const task = TaskFactory.createTask(title);
    commandManager.execute(
      () => {
        taskStore.add(task);
        window.dispatchEvent(new Event('task-added'));
      },
      () => {
        taskStore.remove(task.id);
        window.dispatchEvent(new Event('task-removed'));
      }
    );
  };

  const handleRemove = (task: Task) => {
    commandManager.execute(
      () => {
        taskStore.remove(task.id);
        window.dispatchEvent(new Event('task-removed'));
      },
      () => {
        taskStore.add(task);
        window.dispatchEvent(new Event('task-added'));
      }
    );
  };

  const handleToggle = (task: Task) => {
    commandManager.execute(
      () => taskStore.toggle(task.id),
      () => taskStore.toggle(task.id)
    );
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h1>Todo List</h1>
        <button onClick={() => setIsModalOpen(true)}>+ Add</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => commandManager.undo()}>Undo</button>
        <button onClick={() => commandManager.redo()}>Redo</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={() => handleToggle(task)}
            onRemove={() => handleRemove(task)}
          />
        ))}
      </ul>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onAdd={handleAdd} />
      )}
    </div>
  );
};
