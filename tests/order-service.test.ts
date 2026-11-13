import { describe, expect, it } from "vitest";
import { createOrderService, type OrderRepository } from "../src/application/order-service.js";
import type { Order } from "../src/domain/order.js";

function repository(): OrderRepository & { orders: Map<string, Order> } {
  const orders = new Map<string, Order>();
  return {
    orders,
    save: (order) => orders.set(order.id, order),
    findById: (id) => orders.get(id)
  };
}

describe("order service", () => {
  it("creates and persists an order through the repository", () => {
    const repo = repository();
    const service = createOrderService(repo);

    const order = service.create("Rayane", [{ description: "Book", quantity: 2, unitPrice: 10 }]);

    expect(repo.orders.get(order.id)).toEqual(order);
  });

  it("returns an order from the repository", () => {
    const repo = repository();
    const service = createOrderService(repo);
    const created = service.create("Rayane", [{ description: "Book", quantity: 1, unitPrice: 10 }]);

    expect(service.findById(created.id)).toEqual(created);
    expect(service.findById("missing")).toBeUndefined();
  });
});
