import React from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { HeaderComponent } from "../../components";
import { OrderCard } from "../../components/OrderCart";
import { orders } from "../../api/order";
import { IOrder } from "./interfaces/order.interface";

export const OrdersPage: React.FC = () => {
  const [allOrders, setAllOrders] = React.useState<IOrder[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    orders
      .getAll() 
      .then((response) => {
        setAllOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>loading orders...</div>;
  }

  return (
    <Container maxWidth="xl">
      <HeaderComponent
        title="Orders"
        description="Orders window"
        element={
          <Button fullWidth variant="contained">
            See all orders
          </Button>
        }
      />

      <Box mt={4}>
        {allOrders.length > 0 ? (
          <Grid container spacing={2}>
            {allOrders.map((order) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
                <OrderCard order={order} showDetailsButton={true} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box mt={4}>
            <p>Orders Not Found.</p>
          </Box>
        )}
      </Box>
    </Container>
  );
};
