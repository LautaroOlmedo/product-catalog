import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';
import { IProduct } from '../../pages/products/interfaces/product.interface';
import { orders } from '../../api/order';
import axios from 'axios';
import { ICreateOrder } from '../../pages/order/interfaces/order.interface';

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
  const [quantity, setQuantity] = React.useState<string>('1');
  const [loading, setLoading] = React.useState(false);

  const numericQuantity = Number(quantity);

  const isEmpty = quantity.trim() === '';
  const isTooLow = !isEmpty && numericQuantity < 1;
  const isTooHigh = !isEmpty && numericQuantity > 100;
  const isValidQuantity = !isEmpty && !isTooLow && !isTooHigh && !isNaN(numericQuantity);

  const total = isValidQuantity ? product.price * numericQuantity : 0;

  const handleBuy = async () => {
    if (!isValidQuantity) return;

    const order: ICreateOrder = {
      product_id: product.id,
      quantity: numericQuantity,
    };

    try {
      setLoading(true);
      await orders.create(order);
      onSuccess(numericQuantity);
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

  let errorMessage = '';
  if (isTooLow) errorMessage = 'Quantity must be at least 1';
  else if (isTooHigh) errorMessage = 'Quantity cannot be greater than 100';

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Purchase summary</Typography>
        <Divider sx={{ my: 2 }} />

        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          inputProps={{
            min: 1,
            max: 100,
            pattern: '[0-9]*',
          }}
          fullWidth
          error={!!errorMessage} 
        />
        {errorMessage && (
          <FormHelperText sx={{ color: 'red', mb: 1 }}>{errorMessage}</FormHelperText>
        )}

        <Typography sx={{ mt: 2 }}>
          Total: <strong>${total.toFixed(2)}</strong>
        </Typography>

        <Button
          fullWidth
          sx={{ mt: 3 }}
          variant="contained"
          disabled={loading || !isValidQuantity}
          onClick={handleBuy}
        >
          {loading ? 'Processing…' : 'Confirm purchase'}
        </Button>
      </CardContent>
    </Card>
  );
};


