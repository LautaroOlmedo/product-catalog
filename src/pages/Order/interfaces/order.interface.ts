export interface ICreateOrder {
  product_id: string;
  quantity: number;
}

export interface IOrder{
    id: string
    product_id: string
    quantity: string
    total: string
    created_at: string
}