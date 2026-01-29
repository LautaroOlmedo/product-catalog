import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { RouterLayout } from "./common/RouterLayout";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import { ProductPurchaseMenu } from "./components/ProductPurchaseMenu";
import { OrdersPage } from "./pages/Order";
import { ProductsPage } from "./pages/Products";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
       <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage/>} />
        <Route path="/orders" element={<OrdersPage/>} />
      </Route>
     
    </Routes>
  );
};

