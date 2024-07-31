import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { faker } from "@faker-js/faker";
import { app } from "../src";
import { Roles } from "../src/constants";
import { fakerMember } from "./factory";
import {
	type AuthHeaders,
	clearMember,
	createMember,
	fakeAuthHeaders,
	getMember,
} from "./helper/auth.helper";

describe("Members API", () => {
	const api = treaty(app);
	let authHeaders: AuthHeaders;

	beforeAll(async () => {
		authHeaders = await fakeAuthHeaders({ role: Roles.admin });
	});

	afterAll(async () => {
		await clearMember();
	});

	describe("Get list member API", () => {
		it("Should fail when not sign in", async () => {
			const { status, error } = await api.members.index.get();

			expect(status).toBe(401);
			expect(error?.value).toBe("Unauthorized");
		});

		it("Should fail when is not admin", async () => {
			const { status, error } = await api.members.index.get({
				headers: {
					authorization: "Bearer 1232142141",
				},
			});

			expect(status).toBe(401);
			expect(error?.value).toBe("Invalid token");
		});

		it("Should return list member", async () => {
			const firstMember = await createMember();
			const secondMember = await createMember();
			const thirdMember = await createMember();

			const { status, data } = await api.members.index.get({ ...authHeaders });

			expect(status).toBe(200);
			expect(data?.total).toBe(3);
			expect(data?.items).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						id: firstMember.id,
						email: firstMember.email,
					}),
					expect.objectContaining({
						id: secondMember.id,
						email: secondMember.email,
					}),
					expect.objectContaining({
						id: thirdMember.id,
						email: thirdMember.email,
					}),
				]),
			);
		});
	});

	describe("Create member API", () => {
		it("Should fail when duplicated email", async () => {
			const email = faker.internet.email();
			await createMember({ email });

			const request = await fakerMember({ email });

			const { status, error } = await api.members.index.post(request, {
				...authHeaders,
			});

			expect(status).toBe(400);
			expect(error?.value).toBe("Duplicated email");
		});

		it("Should sucess", async () => {
			const member = await fakerMember();

			const { data, status } = await api.members.index.post(member, {
				...authHeaders,
			});

			expect(status).toBe(200);
			expect(data).toBeDefined();

			if (!data) {
				throw new Error();
			}

			const createdMember = await getMember(data);
			expect(createdMember?.email).toBe(member.email);
		});
	});
});
