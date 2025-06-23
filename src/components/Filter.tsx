import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

export const Filter = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const setFilter = (type: string) => {
    const event = new CustomEvent('setFilter', { detail: type });
    window.dispatchEvent(event);
    setActiveFilter(type);
  };

  const isAll = activeFilter === 'all';
  const isActive = activeFilter === 'active';
  const isCompleted = activeFilter === 'completed';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="large" aria-label="Large button group">
        <Button
          variant={isAll ? 'contained' : 'outlined'}
          key="all"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={isActive ? 'contained' : 'outlined'}
          key="active"
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={isCompleted ? 'contained' : 'outlined'}
          key="completed"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </ButtonGroup>
    </Box>
  );
};
