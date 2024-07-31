import { sign } from "jsonwebtoken";
import { db } from "../../src/db";
import { members } from "../../src/db/schema";
import type { Member } from "../../src/db/types";
import { fakerMember } from "../factory";

export interface AuthHeaders {
	headers: {
		authorization: string;
	};
}

export const createMember = async (
	override?: Partial<Member>,
): Promise<Member> => {
	const member = await fakerMember(override);
	const createdMember = await db.insert(members).values(member).returning();
	return createdMember[0];
};

export const fakeAuthHeaders = async (
	override?: Partial<Member>,
): Promise<AuthHeaders> => {
	const member = await createMember(override);
	const token = sign(
		{ id: member.id, email: member.email, role: member.role },
		process.env.JWT_SECRET,
	);

	return { headers: { authorization: `Bearer ${token}` } };
};

export const getMember = async (memberId: number): Promise<Maybe<Member>> =>
	db.query.members.findFirst({ where: ({ id }, { eq }) => eq(id, memberId) });

export const clearMember = async () => db.delete(members);
