import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

export const Filter = () => {
  const setFilter = (type: string) => {
    const event = new CustomEvent('setFilter', { detail: type });
    window.dispatchEvent(event);
  };

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
        <Button key="all" onClick={() => setFilter('all')}>
          All
        </Button>
        <Button key="active" onClick={() => setFilter('active')}>
          Active
        </Button>
        <Button key="completed" onClick={() => setFilter('completed')}>
          Completed
        </Button>
      </ButtonGroup>
    </Box>
  );
};
