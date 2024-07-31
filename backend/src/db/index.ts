import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

export const client = new Client({
	connectionString: process.env.DB_URL,
});

export const db = drizzle(client, {
	schema,
	logger: process.env.DB_LOGGING === "true",
});
