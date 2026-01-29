import React from "react";
import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { products } from "../../api/products";
import { orders } from "../../api/order";
import { IProduct } from "../products/interfaces/product.interface";
import { IOrder } from "../order/interfaces/order.interface";
import { useNavigate } from "react-router-dom";

export const DashboardPage: React.FC = () => {
  const [allProducts, setAllProducts] = React.useState<IProduct[]>([]);
  const [allOrders, setAllOrders] = React.useState<IOrder[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true);

    // Traer products y orders
    Promise.all([products.getAll({ limit: 20 }), orders.getAll()])
      .then(([productsRes, ordersRes]) => {
        setAllProducts(productsRes.data);
        setAllOrders(ordersRes.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getProductName = (productId: string) => {
    const product = allProducts.find((p) => p.id === productId);
    return product ? product.name : productId;
  };

  if (loading) return <Typography>Cargando dashboard...</Typography>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Products
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allProducts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.description}</TableCell>
                    <TableCell>${p.price}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/products/${p.id}`)}
                      >
                        Ver detalle
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Orders
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>{new Date(o.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{getProductName(o.product_id)}</TableCell>
                    <TableCell>{o.quantity}</TableCell>
                    <TableCell>${o.total}</TableCell>
                    <TableCell>{new Date(o.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};
