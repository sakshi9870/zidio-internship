import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

// Corrected component name and improved loading indicator
const Loading = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
    >
      <CircularProgress size={60} />
      <Typography variant="h6" marginTop={2}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loading;
