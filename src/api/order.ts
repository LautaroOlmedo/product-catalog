import { orderInstance } from "./base.api";
import { ICreateOrder } from "../pages/Order/interfaces/order.interface";
import { TypeOrder } from "../pages/home/interface/order.interface";

export const orders = {
  create: (data: ICreateOrder) => {
    return orderInstance.post("", data);
  },
  getAll: () => {
      return orderInstance.get<TypeOrder[]>("", {
     
      });
    },
};
