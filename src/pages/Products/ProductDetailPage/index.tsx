import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../../api/products';
import { IProduct } from '../interfaces/product.interface';
import { ProductPurchaseMenu } from '../../../components/ProductPurchaseMenu';


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [showPurchase, setShowPurchase] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;

    products
      .getById({ id })
      .then((r) => {
        setProduct(r.data);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handlePurchaseSuccess = (quantity: number) => {
    setProduct((prev) =>
      prev ? { ...prev, stock: prev.stock - quantity } : prev
    );
    setShowPurchase(false);
    setSuccess(true);
    setError(null);
  };

  const handlePurchaseError = (message: string) => {
    setError(message);
    setSuccess(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" sx={{ mt: 4 }}>
          Product Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {success && (
        <Alert
          severity="success"
          sx={{ mt: 3 }}
          onClose={() => setSuccess(false)}
        >
          Purchase completed successfully 🎉
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ mt: 3 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* INFO */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {product.name}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Chip color="primary" label={`Price: $${product.price}`} />
            <Chip
              color={product.stock > 0 ? 'success' : 'error'}
              variant="outlined"
              label={
                product.stock > 0
                  ? `Stock: ${product.stock}`
                  : 'Out of stock'
              }
            />
            <Button
              variant="contained"
              onClick={() => setShowPurchase((prev) => !prev)}
              disabled={product.stock === 0}
            >
              Buy
            </Button>
            
          </Box>
        </Grid>

        {/* COMPRA */}
        <Grid item xs={12} md={6}>
          {showPurchase && (
            <ProductPurchaseMenu
              product={product}
              onSuccess={handlePurchaseSuccess}
              onError={handlePurchaseError}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;