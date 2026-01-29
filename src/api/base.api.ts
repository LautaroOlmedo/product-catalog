import axios from "axios";

const BASE_PRODUCTS_URL = "http://localhost:8080/api/products";
const BASE_ORDERS_URL = "http://localhost:8080/api/orders";

export const productInstance = axios.create({
  baseURL: BASE_PRODUCTS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const orderInstance = axios.create({
  baseURL: BASE_ORDERS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

