import { t } from "elysia";

export const MembeRes = t.Object({
	id: t.Number(),
	name: t.String(),
	email: t.String(),
	role: t.String(),
});

export const GetListMemberRes = t.Object({
	total: t.Number(),
	items: t.Array(MembeRes),
});
