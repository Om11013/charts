import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography>Welcome to Om's Website</Typography>
        <Typography>Go to chart generation from csv</Typography>
        <Button variant='outlined' onClick={() => navigate('/csv')}>
          Go now
        </Button>
      </Box>
    </div>
  );
};

export default Home;
