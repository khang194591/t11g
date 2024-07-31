import type { Member } from "../db/types";

export const parseGetListRes = <T>(
	total: { count: number }[],
	items: T[],
): {
	total: number;
	items: T[];
} => {
	return {
		total: total[0].count,
		items,
	};
};

export const generateToken = async (
	member: Member,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	jwt: any,
): Promise<string> => {
	return jwt.sign({
		id: member.id,
		role: member.role,
	});
};
