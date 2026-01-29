import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { IProduct } from '../../pages/Products/interfaces/product.interface';
import { ICreateOrder } from '../../pages/Order/interfaces/order.interface';
import { orders } from '../../api/order';
import axios from 'axios';

type Props = {
  product: IProduct;
  onSuccess: (quantity: number) => void;
  onError: (message: string) => void;
};

export const ProductPurchaseMenu: React.FC<Props> = ({
  product,
  onSuccess,
  onError,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const total = product.price * quantity;

  const handleBuy = async () => {
    const order: ICreateOrder = {
      product_id: product.id,
      quantity,
    };

    try {
      setLoading(true);
      await orders.create(order);
      onSuccess(quantity);
    } catch (err) {
      let message = 'Unexpected error';


if (axios.isAxiosError(err)) {
  
  const data = err.response?.data as { message?: string } | string | undefined;

  if (typeof data === 'string') {
    message = data;
  } else if (data && typeof data.message === 'string') {
    message = data.message;
  } else {
    message = err.message;
  }
}


      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Purchase summary</Typography>
        <Divider sx={{ my: 2 }} />

        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          inputProps={{ min: 1, max: product.stock }}
          fullWidth
        />

        <Typography sx={{ mt: 2 }}>
          Total: <strong>${total}</strong>
        </Typography>

        <Button
          fullWidth
          sx={{ mt: 3 }}
          variant="contained"
          disabled={loading}
          onClick={handleBuy}
        >
          {loading ? 'Processing…' : 'Confirm purchase'}
        </Button>
      </CardContent>
    </Card>
  );
};
