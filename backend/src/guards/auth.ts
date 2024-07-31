import bearer from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const authGuard = new Elysia({ name: "admin-guard" })
	.use(jwt({ secret: process.env.JWT_SECRET }))
	.use(bearer())
	.guard({
		as: "scoped",
		beforeHandle: async ({ error, bearer, jwt }) => {
			if (!bearer) {
				return error(401, "Unauthorized");
			}
			const member = await jwt.verify(bearer);

			if (!member) {
				return error(401, "Invalid token");
			}
		},
	});
