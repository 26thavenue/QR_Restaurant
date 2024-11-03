import { integer, pgTable, varchar,text, uuid } from "drizzle-orm/pg-core";
import { RestaurantStatus } from "../../types";

export const restaurantTable = pgTable("restaurant", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  status:text('status').notNull().default(RestaurantStatus.PENDING),
});

export const menuTable = pgTable("menu", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});

export const ordersTable = pgTable("orders", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});