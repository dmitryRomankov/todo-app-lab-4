import Button from '@mui/material/Button';
import { TaskList } from './components/TaskList';
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
        <h1>Task List</h1>
        <Button
          style={{ marginLeft: 'auto', fontWeight: '600' }}
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          + Add
        </Button>
      </div>

      <Filter />
      <TaskList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Notification />
    </div>
  );
};

export default App;
