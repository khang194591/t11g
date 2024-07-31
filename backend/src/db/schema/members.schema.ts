import { sql } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { Roles } from "../../constants";

export const members = pgTable("members", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	email: varchar("email").notNull().unique("uniq_member_email"),
	password: varchar("password").notNull(),
	role: varchar("role").notNull().default(Roles.member),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
	deletedAt: timestamp("deleted_at"),
});
