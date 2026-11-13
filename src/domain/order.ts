import { randomUUID } from "node:crypto";

export type OrderItemInput = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  customerName: string;
  items: OrderItemInput[];
  total: number;
  createdAt: string;
};

export function createOrder(customerName: string, items: OrderItemInput[]): Order {
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  return {
    id: randomUUID(),
    customerName,
    items,
    total: Number(total.toFixed(2)),
    createdAt: new Date().toISOString()
  };
}

