import React from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { CardComponent, HeaderComponent } from "../../components";

import { products } from "../../api/products";
import { TypeProduct } from "./interface/product.interface";

export const HomePage: React.FC<{}> = () => {
  const [allProducts, setAllProducts] = React.useState<TypeProduct[] | null>(null)

  React.useEffect(() => {
    products.getAll({ limit: 10 }).then((r) => {
      setAllProducts(r.data)
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <Container maxWidth="xl">
      <HeaderComponent
        title="Hola mundo"
        description="Hola mundo bienvenido a Codrr"
        element={
          <Button fullWidth variant="contained">
            Welcome
          </Button>
        }
      />
      <div>
        {
          allProducts?.length !== 0 ? (
            <Grid container spacing={2} direction="row">
              {allProducts!.map((product) => (
                <Grid item xs={3}>
                  <CardComponent key={product.id} name={product.name} description={product.description} price={product.price} stock={product.stock} />
                </Grid>
              ))}
            </Grid>
          ) : ""
        }
      </div>
     
    </Container>
  );
};
