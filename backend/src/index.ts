import { bearer } from "@elysiajs/bearer";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { serverTiming } from "@elysiajs/server-timing";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { client } from "./db";
import { errorPlugin } from "./plugins/error";
import { authRoutes } from "./routes/auth";
import { memberRoutes } from "./routes/members";

await client.connect();

export const app = new Elysia()
	.use(swagger())
	.use(bearer())
	.use(cors())
	.use(jwt({ secret: process.env.JWT_SECRET }))
	.use(serverTiming())
	.use(errorPlugin)
	.use(authRoutes)
	.use(memberRoutes)
	.listen(process.env.PORT);

console.log(`
	Server: ${app.server?.url}
	Documentation: ${app.server?.url}swagger
`);

export type App = typeof app;
