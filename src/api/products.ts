import { productInstance } from "./base.api";
import { TypeProduct } from "./interfaces/product.interface";

interface GetAllProductsParams {
  limit?: number;
}

export const products = {
  getAll: (params?: GetAllProductsParams) => {
    return productInstance.get<TypeProduct[]>("", {
      params,
    });
  },

  getById: function({id}: {id: string | undefined}){
    return productInstance.get<TypeProduct>(`/${id}`);
  },
  


  update: (id: string, data: Partial<TypeProduct>) => {
    return productInstance.put(`/${id}`, data);
  },

  delete: (id: string) => {
    return productInstance.delete(`/${id}`);
  },
};
