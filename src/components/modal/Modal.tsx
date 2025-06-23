import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import './Modal.css';

interface ModalProps {
  onClose: () => void;
  onAdd: (title: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
    onClose();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Add New Todo</h2>
        <TextField
          variant="outlined"
          type="text"
          label="Enter task..."
          name="addTodo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={inputRef}
          autoFocus
        />
        <div className="modal-actions">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!title.trim()}
          >
            Add todo
          </Button>
        </div>
      </div>
    </div>
  );
};
