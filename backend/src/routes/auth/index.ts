import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { db } from "../../db";
import { members } from "../../db/schema";
import { ErrRes } from "../../schema";
import { AuthRes, SignInReq, SignUpReq } from "../../schema/auth";
import { generateToken } from "../../utils";

export const authRoutes = new Elysia({ name: "auth-routes" })
	.use(jwt({ secret: process.env.JWT_SECRET }))
	.group("/auth", (app) =>
		app
			.post(
				"/sign-in",
				async ({ body, jwt, error }) => {
					const member = await db.query.members.findFirst({
						where: (member, { eq }) => eq(member.email, body.email),
					});

					if (!member) {
						return error(400, "Invalid credentials");
					}

					const isMatch = await Bun.password.verify(
						body.password,
						member.password,
					);

					if (!isMatch) {
						return error(400, "Invalid credentials");
					}

					return { token: await generateToken(member, jwt), member };
				},
				{
					body: SignInReq,
					response: { 200: AuthRes, 400: ErrRes },
					tags: ["authentication"],
				},
			)
			.post(
				"/sign-up",
				async ({ body, jwt, error }) => {
					const existedMember = await db.query.members.findFirst({
						where: (member, { eq }) => eq(member.email, body.email),
					});

					if (existedMember) {
						return error(400, "Duplicated email");
					}

					body.password = await Bun.password.hash(body.password, "bcrypt");

					const member = await db.insert(members).values(body).returning();

					return {
						token: await generateToken(member[0], jwt),
						member: member[0],
					};
				},
				{
					body: SignUpReq,
					response: { 200: AuthRes, 400: ErrRes },
					tags: ["authentication"],
				},
			),
	);
