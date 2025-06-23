import React, { useState } from 'react';
import './Modal.css';

interface ModalProps {
  onClose: () => void;
  onAdd: (title: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Add New Todo</h2>
        <input
          type="text"
          placeholder="Enter task..."
          name="addTodo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleAdd} disabled={!title.trim()}>
            Add todo
          </button>
        </div>
      </div>
    </div>
  );
};
