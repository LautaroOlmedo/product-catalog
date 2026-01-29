import React from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
  
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh", 
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/products")}
            >
              Products
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/orders")}
            >
              Orders
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
