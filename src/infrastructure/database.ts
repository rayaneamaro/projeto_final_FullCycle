import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import type { Order } from "../domain/order.js";

export function openDatabase(filename: string): Database.Database {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  const db = new Database(filename);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      items_json TEXT NOT NULL,
      total REAL NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
  return db;
}

export function saveOrder(db: Database.Database, order: Order): void {
  db.prepare(`
    INSERT INTO orders (id, customer_name, items_json, total, created_at)
    VALUES (@id, @customerName, @items, @total, @createdAt)
  `).run({
    id: order.id,
    customerName: order.customerName,
    items: JSON.stringify(order.items),
    total: order.total,
    createdAt: order.createdAt
  });
}

export function findOrder(db: Database.Database, id: string): Order | undefined {
  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(id) as
    | { id: string; customer_name: string; items_json: string; total: number; created_at: string }
    | undefined;
  if (!row) return undefined;
  return {
    id: row.id,
    customerName: row.customer_name,
    items: JSON.parse(row.items_json) as Order["items"],
    total: row.total,
    createdAt: row.created_at
  };
}
