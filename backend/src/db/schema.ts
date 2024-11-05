import { integer, pgTable, varchar,text, uuid,timestamp, time, boolean, primaryKey } from "drizzle-orm/pg-core";
import { RestaurantStatus } from "../types";
import { relations } from "drizzle-orm";

export const restaurantTable = pgTable("restaurant", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  status:text('status').notNull().default(RestaurantStatus.PENDING),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  location: text("location")
});

export const restaurantTableRelations = relations(restaurantTable, ({one, many})  =>({
    menuTable:one(menuTable),
    table:many(table)
}))

export const menuTable = pgTable("menu", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  restaurantId:text("restaurantId").references(() => restaurantTable.id)
});

export const menuTableRelations = relations(menuTable, ({one, many})  =>({
    restaurantTable:one(restaurantTable, {
      fields:[menuTable.restaurantId],
      references:[restaurantTable.id]
    }),
    menuItemsTable: many(menuItemsTable)
}))

export const menuItemsTable = pgTable("menuItems", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  price:integer("price").notNull(),
  description:text().notNull(),
  timeTakenToPrepare:time("ttP").notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  rating:integer("rating"),
  numberOrdered:integer("numberOrdered"),
  stock:integer("stock"),
  restaurantId:text("restaurantId"),
  menuId:text("menuId"),
  isDiscount: boolean("isDiscount").default(false),
  discountPercent:integer("discountPercent").default(0)
});

export const menuItemTableRelations = relations(menuItemsTable, ({one,many})  =>({
    menu:one(menuTable,{
      fields:[menuItemsTable.menuId],
      references:[menuTable.id]
    }),

    menuItemsOnOrdersTable:many(menuItemsOnOrdersTable)
}))

export const ordersTable = pgTable("orders", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  totalPrice: integer("totalPrice"),

});

export const orderTableRelations = relations(ordersTable,({many})  =>({
    menuItemsOnOrdersTable:many(menuItemsOnOrdersTable)
}))

export const menuItemsOnOrdersTable = pgTable("menuItemsOnOrdersTable",{
    menuItemId:text("menuItemId").notNull().references(() => menuItemsTable.id),
    orderId: text("orderId").notNull().references(() => ordersTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.menuItemId, t.orderId] }),
  }),
)

export const menuItemsOnOrdersTableRelations = relations(menuItemsOnOrdersTable, ({ one }) => ({
    menuItem: one(menuItemsTable, {
      fields: [menuItemsOnOrdersTable.menuItemId],
      references: [menuItemsTable.id],
    }),
   order: one(ordersTable, {
      fields: [menuItemsOnOrdersTable.orderId],
      references: [ordersTable.id],
    }),
}))


export const table = pgTable("orders", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  restaurantId:text("restaurantId").references(() => restaurantTable.id)
});

export const tableRelations = relations(table, ({one}) =>({
  restaurant:one(restaurantTable,{
    fields:[table.restaurantId],
    references:[restaurantTable.id]
  })
}))

// export const inventoryTable = pgTable( "inventory",{
//     id: uuid('id').defaultRandom().primaryKey(),
//     name: varchar({ length: 255 }).notNull(),
//     createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
// })

// export const paymentTable = pgTable( "payments",{
//      id: uuid('id').defaultRandom().primaryKey(),
//     name: varchar({ length: 255 }).notNull(),
//     createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
// })

// export const userTable = pgTable( "users",{
//      id: uuid('id').defaultRandom().primaryKey(),
//     name: varchar({ length: 255 }).notNull(),
//     createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
// })