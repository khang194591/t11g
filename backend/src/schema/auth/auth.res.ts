import { t } from "elysia";

export const AuthRes = t.Object({
	token: t.String(),
	member: t.Object({
		id: t.Number(),
		role: t.String(),
		email: t.String(),
	}),
});
