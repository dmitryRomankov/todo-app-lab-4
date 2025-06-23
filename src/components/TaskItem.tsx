import { useState, type FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

import type { Task } from '../models/Task';
import Button from '@mui/material/Button';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
  onEdit: (newTitle: string) => void;
}

export const TaskItem: FC<TaskItemProps> = ({
  task,
  onRemove,
  onToggle,
  onEdit,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleSave = () => {
    if (title.trim() && title.trim() !== task.title) {
      onEdit(title.trim());
    }
    setEditMode(false);
  };

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

        <div style={{ display: 'flex', gap: '8px' }}>
          <Tooltip title={editMode ? 'Save task' : 'Edit task'} placement="top">
            {editMode ? (
              <Button onClick={handleSave}>Save</Button>
            ) : (
              <IconButton onClick={() => setEditMode(true)}>
                <EditIcon />
              </IconButton>
            )}
          </Tooltip>

          <Tooltip title="Remove task" placement="top">
            <IconButton
              onClick={onRemove}
              aria-label="remove task"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {editMode ? (
        <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <span
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            fontSize: '22px',
            fontWeight: '700',
          }}
        >
          {task.title}
        </span>
      )}
    </li>
  );
};
