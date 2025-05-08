import { Box, Typography } from '@mui/material';

export const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #ddd',
      borderRadius: 2,
      padding: 2,
      boxShadow: 2,
      backgroundColor: '#fff',
      width: 'fit-content',
    }}
  >
    <Typography variant='h6' gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
);
