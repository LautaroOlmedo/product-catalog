import { Typography, Box } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h6">
        Page not found
      </Typography>
    </Box>
  );
};
