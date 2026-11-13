import { describe, expect, it } from "vitest";
import { createOrder } from "../src/domain/order.js";

describe("createOrder", () => {
  it("calculates the total and generates an id", () => {
    const order = createOrder("Rayane", [{ description: "Book", quantity: 2, unitPrice: 10.5 }]);
    expect(order.id).toEqual(expect.any(String));
    expect(order.total).toBe(21);
  });
});
