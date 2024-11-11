import { integer, pgTable, text, uuid,timestamp, time, boolean, primaryKey } from "drizzle-orm/pg-core";
import { RestaurantStatus ,FoodCategories} from "../types";
import { relations } from "drizzle-orm";

export const restaurantTable = pgTable("restaurant", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  status:text('status').notNull().default(RestaurantStatus.PENDING),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  location: text("location"),
  description:text('description')
});

export const locationTable = pgTable("location", {
  id: uuid('id').defaultRandom().primaryKey(),
  country: text('country').notNull(),
  state:text('state').notNull(),
  city: text('city').notNull(),
  restaurantId:uuid('restaurant_id').notNull().references(()=> restaurantTable.id),
  address: text('address').notNull()
})

export const menuTable = pgTable("menu", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  restaurantId:uuid("restaurant_id").references(() => restaurantTable.id)
});

export const menuItemsTable = pgTable("menuItems", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text("name").notNull(),
  price:integer("price").notNull(),
  description:text("description").notNull(),
  timeTakenToPrepare:time("ttP").notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  rating:integer("rating"),
  numberOrdered:integer("numberOrdered").default(0),
  stock:integer("stock"),
  restaurantId:uuid("restaurantId").notNull(),
  menuId:uuid("menuId").notNull().references(() =>menuTable.id),
  isDiscount: boolean("isDiscount").default(false),
  discountPercent:integer("discountPercent").default(0),
  categories:text('categories').notNull()
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
  name: text("name").notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  totalPrice: integer("totalPrice").notNull(),
});

export const table = pgTable("orders", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  restaurantId:uuid("restaurant_id").references(() => restaurantTable.id)
});

// JOINT TABLES

export const menuItemsOnOrdersTable = pgTable("menu_items_on_ordersTable",{
    menuItemId:uuid("menuItemId"),
    orderId: uuid("orderId"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.menuItemId, t.orderId] }),
  }),
)


//  RELATIONS

export const restaurantTableRelations = relations(restaurantTable, ({ one,many})  =>({
    menuTable:many(menuTable),
    table:many(table),
    location: many(locationTable)
}))

export const orderTableRelations = relations(ordersTable,({many})  =>({
    menuItemsOnOrdersTable:many(menuItemsOnOrdersTable)
}))

export const locationTableRelations = relations(locationTable, ({ one})  =>({
    restaurantTable:one(restaurantTable, {
      fields:[locationTable.restaurantId],
      references:[restaurantTable.id]
    }),
}))

export const menuTableRelations = relations(menuTable, ({one, many})  =>({
    restaurantTable:one(restaurantTable, {
      fields:[menuTable.restaurantId],
      references:[restaurantTable.id]
    }),
    menuItemsTable: many(menuItemsTable)
}))

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

export const tableRelations = relations(table, ({one}) =>({
  restaurant:one(restaurantTable,{
    fields:[table.restaurantId],
    references:[restaurantTable.id]
  })
}))





// NOTIFICATIONS, USERS, PAYMENT,COUPON, INVITE LINK, SAVED DISHES TABLE

// GET A USER FAVOURRITE RESTAURANT B SEEING THE FREQUENT ORDERS AFTER LIKE 10 ORDERS

// NOTIFICATIONS FOR NEW DISH FROM FAVOURITE RESTAURANT

// EMAIL ALERT AND NOTIFCATIONS WHEN AN ITEM FALLS BELOW STOCK

// NOTIFICATIONS FOR NEW ORDERS 

// NOTIFIATIONS FOR SEASONAL ORDERS

// NOTIFICATIONS FOR COUPONS / DISCOUNT CODES

// NOTIFICATIONS FOR COUPON EXPIRATION

// EMAIL FOR VERIFICATION OF USER'S ACCOUNT

// ALLOWING USER THAT IS NOT PART OF THE SSTEM TO ORDER

// QR CODE GENERATION

// MAGIC TABLE FEATURE




