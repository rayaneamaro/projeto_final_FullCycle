import { createOrder, type Order, type OrderItemInput } from "../domain/order.js";

export type OrderRepository = {
  save(order: Order): void;
  findById(id: string): Order | undefined;
};

export function createOrderService(repository: OrderRepository) {
  return {
    create(customerName: string, items: OrderItemInput[]): Order {
      const order = createOrder(customerName, items);
      repository.save(order);
      return order;
    },
    findById(id: string): Order | undefined {
      return repository.findById(id);
    }
  };
}
