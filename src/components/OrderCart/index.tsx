import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { IOrder } from "../../pages/Order/interfaces/order.interface";
import { useNavigate } from "react-router-dom";


type OrderCardProps = {
  order: IOrder;
  showDetailsButton?: boolean; 
};

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  showDetailsButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Orden: {order.id}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ mt: 1 }}>
          <Typography variant="body1">
            <strong>Quantity:</strong> {order.quantity}
          </Typography>
          <Typography variant="body1">
            <strong>Total: $</strong> ${order.total}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Date:</strong>{" "}
            {new Date(order.created_at).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>

     
    </Card>
  );
};
