import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/**/*.schema.ts",
	out: "./drizzle",
	dbCredentials: {
		url: process.env.DB_URL,
		host: process.env.DB_HOST,
		port: +process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	},
});
