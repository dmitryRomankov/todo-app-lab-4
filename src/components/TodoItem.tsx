import type { FC } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

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
        <FormControlLabel
          control={
            <Checkbox
              color="success"
              name="complete"
              checked={task.completed}
              onChange={onToggle}
            />
          }
          label={task.completed ? 'Incomplete task' : 'Complete task'}
        />

        <Button onClick={onRemove}>Remove</Button>
      </div>
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          fontSize: '22px',
          fontWeight: '700',
        }}
      >
        {task.title}
      </span>
    </li>
  );
};
