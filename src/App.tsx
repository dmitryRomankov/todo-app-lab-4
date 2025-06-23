import Button from '@mui/material/Button';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { Notification } from './components/notification/Notification';

import './styles/main.css';
import { useState } from 'react';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h1>Todo List</h1>
        <Button
          style={{ marginLeft: 'auto' }}
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          + Add
        </Button>
      </div>

      <Filter />
      <TodoList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Notification />
    </div>
  );
};

export default App;
