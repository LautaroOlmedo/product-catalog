import { orderInstance } from "./base.api";
import { ICreateOrder } from "../pages/order/interfaces/order.interface";
import { TypeOrder } from "./interfaces/order.interface";
export const orders = {
  create: (data: ICreateOrder) => {
    return orderInstance.post("", data);
  },
  getAll: () => {
      return orderInstance.get<TypeOrder[]>("", {
     
      });
    },
};
