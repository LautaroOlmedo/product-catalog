import React from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { CardComponent, HeaderComponent } from "../../components";

import { products } from "../../api/products";
import { TypeProduct } from "../home/interface/product.interface";

export const ProductsPage: React.FC = () => {
  const [allProducts, setAllProducts] = React.useState<TypeProduct[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    products
      .getAll({ limit: 10 })
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <Container maxWidth="xl">
      <HeaderComponent
        title="Products"
        description="Products window"
        element={
          <Button fullWidth variant="contained">
            See all products
          </Button>
        }
      />

      <Box mt={4}>
        {allProducts.length > 0 && (
          <Grid container spacing={2}>
            {allProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <CardComponent
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  stock={product.stock}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};
