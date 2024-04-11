import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const LoadingScreen = ({ message = 'Loading...' }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <CircularProgress color="primary" size={64} />
            <Typography variant="h6" color="textSecondary" mt={2}>
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingScreen;