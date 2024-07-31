import { type Static, t } from "elysia";

export const SignInReq = t.Object({
	email: t.String({ format: "email" }),
	password: t.String({ minLength: 6 }),
});

export const SignUpReq = t.Object({
	name: t.String(),
	email: t.String({ format: "email" }),
	password: t.String({ minLength: 6 }),
});

export type SignInReqDto = Static<typeof SignInReq>;
export type SignUpReqDto = Static<typeof SignUpReq>;
