import type { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

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
        <Tooltip
          title={task.completed ? 'Incomplete task' : 'Complete task'}
          placement="top"
        >
          <Checkbox
            color="success"
            name="complete"
            checked={task.completed}
            onChange={onToggle}
          />
        </Tooltip>

        <Tooltip title="Remove task" placement="top">
          <IconButton onClick={onRemove} aria-label="remove task" color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
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
