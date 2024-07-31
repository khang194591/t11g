import { afterAll, describe, expect, it } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { faker } from "@faker-js/faker";
import { app } from "../src";
import { fakerMember } from "./factory";
import { createMember } from "./helper/auth.helper";

describe("Auth API", () => {
	const api = treaty(app);

	afterAll(async () => {
		// await clearMember();
	});

	describe("Sign in API", () => {
		it("Should fail when provide incorrect credentials", async () => {
			const { status, error } = await api.auth["sign-in"].post({
				email: faker.internet.email(),
				password: faker.string.alphanumeric({ length: 8 }),
			});

			expect(status).toBe(400);
			expect(error?.value).toBe("Invalid credentials");
		});

		it("Should fail when provide invalid email", async () => {
			const { status, error } = await api.auth["sign-in"].post({
				email: "invalid.email",
				password: faker.string.alphanumeric({ length: 8 }),
			});

			expect(status).toBe(400);
			expect(error?.value).toBe("Expected string to match 'email' format");
		});

		it("Should sucess", async () => {
			const email = "khang194591@gmail.com";
			const password = "123456";
			const member = await createMember({
				name: "Khang",
				email,
				password,
				role: "admin",
			});

			const { data, status } = await api.auth["sign-in"].post({
				email,
				password,
			});

			expect(status).toBe(200);
			expect(data?.member).toEqual(
				expect.objectContaining({ id: member.id, email }),
			);
		});
	});

	describe("Sign up API", () => {
		it("Should fail when duplicated email", async () => {
			const email = faker.internet.email();
			await createMember({ email });

			const request = await fakerMember({ email });

			const { status, error } = await api.auth["sign-up"].post(request);

			expect(status).toBe(400);
			expect(error?.value).toBe("Duplicated email");
		});

		it("Should sucess", async () => {
			const member = await fakerMember();

			const { data, status } = await api.auth["sign-up"].post(member);

			expect(status).toBe(200);
			expect(data?.member.email).toBe(member.email);
		});
	});
});
