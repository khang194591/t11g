import { write } from "bun";
import type Elysia from "elysia";

export const errorPlugin = (app: Elysia) =>
	app.onError(({ code, error, set }) => {
		write("err.json", JSON.stringify({ code, error }, null, 2));

		switch (code) {
			case "VALIDATION":
				set.status = 400;
				return error.validator.Errors(error.value).First().message;

			default:
				return "Internal server error";
		}
	});
