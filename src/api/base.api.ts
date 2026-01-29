import axios from "axios"

const BASE_URL = "https://rickandmortyapi.com/api/"

export const instance = axios.create({
    baseURL: BASE_URL
})




const BASE_PRODUCTS_URL = "http://localhost:8080/api/products"

export const productInstance = axios.create({
    baseURL: BASE_PRODUCTS_URL
})
