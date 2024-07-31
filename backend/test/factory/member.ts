import { faker } from "@faker-js/faker";
import { Roles } from "../../src/constants/";
import { MAX_SERIAL } from "../constants";

import type { Member } from "../../src/db/types";

export const fakerMember = async (
	override?: Partial<Member>,
): Promise<Member> => {
	const member = {
		id: faker.number.int({ max: MAX_SERIAL }),
		name: faker.person.fullName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		role: Roles.member,
		...override,
	};
	return {
		...member,
		password: await Bun.password.hash(member.password, "bcrypt"),
	};
};
