import { useCallback, useEffect, useState, type FC } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Undo from '@mui/icons-material/Undo';
import Redo from '@mui/icons-material/Redo';
import type { Task } from '../models/Task';
import { taskStore } from '../core/TaskStore';
import { TaskItem } from './TaskItem';
import { TaskFactory } from '../core/TaskFactory';
import {
  AllStrategy,
  ActiveStrategy,
  CompletedStrategy,
  type FilterStrategy,
} from '../core/strategies/FilterStrategy';
import { commandManager } from '../core/commands/CommandManager';
import { Modal } from './modal/Modal';

type TaskListProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

export const TaskList: FC<TaskListProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterStrategy>(new AllStrategy());

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

  const handleEdit = (task: Task, newTitle: string) => {
    const oldTitle = task.title;
    commandManager.execute(
      () => taskStore.edit(task.id, newTitle),
      () => taskStore.edit(task.id, oldTitle)
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Tooltip title="Undo action">
          <IconButton onClick={() => commandManager.undo()} aria-label="undo">
            <Undo />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo action">
          <IconButton onClick={() => commandManager.redo()} aria-label="redo">
            <Redo />
          </IconButton>
        </Tooltip>
      </div>

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => handleToggle(task)}
            onRemove={() => handleRemove(task)}
            onEdit={(newTitle) => handleEdit(task, newTitle)}
          />
        ))}
      </ul>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onAdd={handleAdd} />
      )}
    </div>
  );
};
