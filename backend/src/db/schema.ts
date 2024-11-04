import { integer, pgTable, varchar,text, uuid,timestamp, time } from "drizzle-orm/pg-core";
import { RestaurantStatus } from "../types";
import { timeStamp } from "console";

export const restaurantTable = pgTable("restaurant", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  status:text('status').notNull().default(RestaurantStatus.PENDING),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  location: text()
});

export const menuTable = pgTable("menu", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const menuItemsTable = pgTable("menuItems", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  price:integer().notNull(),
  description:text().notNull(),
  timeTakenToPrepare:time().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  rating:integer(),
  numberOrdered:integer(),
  stock:integer()
});

export const ordersTable = pgTable("orders", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const table = pgTable("orders", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const inventoryTable = pgTable( "inventory",{
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const paymentTable = pgTable( "payments",{
     id: uuid('id').defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const userTable = pgTable( "users",{
     id: uuid('id').defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})