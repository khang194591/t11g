import {
	decimal,
	integer,
	pgTable,
	serial,
	text,
	varchar,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	description: text("description"),
	pricePerDay: decimal("price_per_day", { precision: 10, scale: 2 }).notNull(),
	stockQuantity: integer("stock_quantity").notNull(),
	categoryId: integer("category_id")
		.notNull()
		.references(() => categories.id),
	brandId: integer("brand_id")
		.notNull()
		.references(() => brands.id),
	// Denormalized fields for performance
	categoryName: varchar("category_name"),
	brandName: varchar("brand_name"),
	averageRating: decimal("average_rating", { precision: 3, scale: 2 }),
});
