import { count, desc, eq } from "drizzle-orm";
import Elysia from "elysia";
import { Roles } from "../../constants";
import { db } from "../../db";
import { members } from "../../db/schema";
import { adminGuard } from "../../guards/admin";
import { ErrRes, GetListMemberRes, IdRes } from "../../schema";
import { SignUpReq } from "../../schema/auth";
import { parseGetListRes } from "../../utils";

export const memberRoutes = new Elysia({
	name: "members-routes",
	prefix: "members",
})
	.use(adminGuard)
	.get(
		"/",
		async () => {
			const [total, items] = await db.transaction(async (tx) => {
				return Promise.all([
					tx
						.select({ count: count() })
						.from(members)
						.where(eq(members.role, Roles.member)),
					tx.query.members.findMany({
						where: eq(members.role, Roles.member),
						orderBy: [desc(members.id)],
					}),
				]);
			});

			return parseGetListRes(total, items);
		},
		{
			response: GetListMemberRes,
			tags: ["members"],
		},
	)
	.post(
		"/",
		async ({ body, error }) => {
			const existedMember = await db.query.members.findFirst({
				where: (member, { eq }) => eq(member.email, body.email),
			});

			if (existedMember) {
				return error(400, "Duplicated email");
			}

			body.password = await Bun.password.hash(body.password, "bcrypt");

			const member = await db.insert(members).values(body).returning();

			return member[0].id;
		},
		{
			body: SignUpReq,
			response: { 200: IdRes, 400: ErrRes },
			tags: ["members"],
		},
	);
