import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouterLayout } from "./common/RouterLayout";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import { ProductPurchaseMenu } from "./components/ProductPurchaseMenu";
import { DashboardPage } from "./pages/dashboardPage";
import { NotFoundPage } from "./pages/notFound";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Route>
    </Routes>
  );
};
