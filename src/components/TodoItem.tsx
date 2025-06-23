import type { FC } from 'react';
import type { Task } from '../models/Task';

interface TodoItemProps {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({ task, onRemove, onToggle }) => {
  return (
    <li className="todo-item">
      <div className="action-buttons">
        <input
          name="complete"
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
        />
        <button onClick={onRemove}>✖</button>
      </div>
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.title}
      </span>
    </li>
  );
};
