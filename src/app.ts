import express, { type Request, type Response } from "express";
import pino from "pino";
import { Counter, Histogram, Registry } from "prom-client";
import { z } from "zod";
import { createOrder } from "./domain/order.js";
import { findOrder, saveOrder } from "./infrastructure/database.js";
import type Database from "better-sqlite3";

const orderSchema = z.object({
  customerName: z.string().trim().min(1).max(120),
  items: z.array(z.object({
    description: z.string().trim().min(1).max(200),
    quantity: z.number().int().positive(),
    unitPrice: z.number().nonnegative()
  })).min(1)
});

export function createApp(db: Database.Database, logger = pino({ level: "silent" })) {
  const app = express();
  const registry = new Registry();
  const requests = new Counter({
    name: "http_requests_total",
    help: "Total HTTP requests",
    labelNames: ["method", "route", "status"],
    registers: [registry]
  });
  const latency = new Histogram({
    name: "http_request_duration_seconds",
    help: "HTTP request duration",
    labelNames: ["method", "route"],
    registers: [registry]
  });

  app.use(express.json());
  app.use((req, res, next) => {
    const start = process.hrtime.bigint();
    res.on("finish", () => {
      requests.inc({ method: req.method, route: req.path, status: res.statusCode });
      latency.observe({ method: req.method, route: req.path }, Number(process.hrtime.bigint() - start) / 1e9);
      logger.info({ method: req.method, path: req.path, status: res.statusCode }, "request completed");
    });
    next();
  });

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/metrics", async (_req, res) => {
    res.set("Content-Type", registry.contentType);
    res.send(await registry.metrics());
  });
  app.post("/orders", (req: Request, res: Response) => {
    const result = orderSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: "invalid_request", details: result.error.flatten() });
      return;
    }
    const order = createOrder(result.data.customerName, result.data.items);
    saveOrder(db, order);
    res.status(201).json(order);
  });
  app.get("/orders/:id", (req, res) => {
    const order = findOrder(db, req.params.id);
    if (!order) {
      res.status(404).json({ error: "order_not_found" });
      return;
    }
    res.json(order);
  });
  return app;
}
