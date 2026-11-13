import "dotenv/config";
import pino from "pino";
import { createApp } from "./app.js";
import { openDatabase } from "./infrastructure/database.js";

const port = Number(process.env.PORT ?? 3000);
const databaseFile = process.env.DATABASE_FILE ?? "./data/orders.db";
const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });
const app = createApp(openDatabase(databaseFile), logger);

app.listen(port, () => logger.info({ port }, "orders API listening"));
