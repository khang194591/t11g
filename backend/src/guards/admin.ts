import bearer from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { Roles } from "../constants";

export const adminGuard = new Elysia({ name: "admin-guard" })
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

			if (member.role !== Roles.admin) {
				return error(403, "Forbidden");
			}
		},
	});
