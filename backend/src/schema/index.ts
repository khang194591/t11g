import { t } from "elysia";

export * from "./auth";
export * from "./members";

export const IdRes = t.Number();

export const ErrRes = t.String();
