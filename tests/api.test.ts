import request from "supertest";
import { afterEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { openDatabase } from "../src/infrastructure/database.js";

describe("orders API", () => {
  const db = openDatabase(":memory:");
  afterEach(() => db.exec("DELETE FROM orders"));

  it("creates and retrieves an order", async () => {
    const app = createApp(db);
    const created = await request(app).post("/orders").send({
      customerName: "Rayane",
      items: [{ description: "Book", quantity: 2, unitPrice: 10 }]
    });
    expect(created.status).toBe(201);
    expect(created.body.total).toBe(20);

    const fetched = await request(app).get(`/orders/${created.body.id}`);
    expect(fetched.status).toBe(200);
    expect(fetched.body.id).toBe(created.body.id);
  });

  it("rejects an invalid order", async () => {
    const response = await request(createApp(db)).post("/orders").send({ customerName: "", items: [] });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("invalid_request");
  });

  it("exposes health and metrics endpoints", async () => {
    const app = createApp(db);
    expect((await request(app).get("/health")).body).toEqual({ status: "ok" });
    const metrics = await request(app).get("/metrics");
    expect(metrics.status).toBe(200);
    expect(metrics.text).toContain("http_requests_total");
    expect(metrics.text).toContain('http_request_duration_seconds_bucket{le="0.3"');
  });

  it("uses the route template for order metrics", async () => {
    const app = createApp(db);
    const response = await request(app).post("/orders").send({
      customerName: "Rayane",
      items: [{ description: "Book", quantity: 1, unitPrice: 10 }]
    });
    const metrics = await request(app).get("/metrics");

    expect(metrics.text).toContain('http_requests_total{method="POST",route="/orders",status="201"}');
    expect(metrics.text).not.toContain(`route="/orders/${response.body.id}"`);
  });

  it("returns not found for an unknown order", async () => {
    const response = await request(createApp(db)).get("/orders/unknown");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("order_not_found");
  });
});
