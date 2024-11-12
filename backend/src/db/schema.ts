import { pgEnum,integer, pgTable, text, uuid,timestamp, time, boolean, primaryKey } from "drizzle-orm/pg-core";
import { RestaurantStatus ,FoodCategories} from "../types";
import { relations } from "drizzle-orm";

export const FoodCategoriesEnum = pgEnum('foodCategories', [
  FoodCategories.DRINKS,
  FoodCategories.SNACKS,
  FoodCategories.GRILL,
  FoodCategories.DESSERTS,
  FoodCategories.VEGAN,
  FoodCategories.SIDES,
  FoodCategories.MAIN_COURSES,
  FoodCategories.SOUPS,
  FoodCategories.SALAD,
  FoodCategories.APPETIZERS,
  FoodCategories.OTHERS
]);

export const restaurant = pgTable("restaurant", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  status:text('status').notNull().default(RestaurantStatus.PENDING),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  description:text('description').notNull()
});

export const location = pgTable("location",{
  id: uuid('id').defaultRandom().primaryKey(),
  country: text('country').notNull(),
  state:text('state').notNull(),
  city: text('city').notNull(),
  restaurantId:uuid('restaurant_id').notNull().references(()=> restaurant.id),
  address: text('address').notNull()
})

export const menu = pgTable("menu", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  restaurantId:uuid("restaurant_id").references(() => restaurant.id)
});

export const menuItems = pgTable("menuItems", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text("name").notNull(),
  price:integer("price").notNull(),
  description:text("description").notNull(),
  timeTakenToPrepare:time("ttP").notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  rating:integer("rating"),
  numberOrdered:integer("numberOrdered").default(0),
  stock:integer("stock").notNull().default(0),
  restaurantId:uuid("restaurant_id").notNull(),
  menuId:uuid("menu_id").notNull().references(() =>menu.id),
  isDiscount: boolean("is_discount").default(false),
  discountPercent:integer("discount_percent").default(0),
  categories: FoodCategoriesEnum("categories").default(FoodCategories.OTHERS)
});

export const orders = pgTable("orders", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  totalPrice: integer("total_price").notNull(),
});



// JOINT TABLES

export const menuItemsOnOrders = pgTable("menu_items_on_orders",{
    menuItemId:uuid("menuItem_id"),
    orderId: uuid("order_id"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.menuItemId, t.orderId] }),
  }),
)



// RELATIONS

export const restaurantRelations = relations(restaurant, ({ many }) => ({
  locations: many(location),
  menus:many(menu)
}));

export const locationRelations = relations(location, ({ one }) => ({
  restaurant: one(restaurant, { 
    fields: [location.restaurantId],
    references: [restaurant.id],
  }),
}));

export const menuRelations = relations(menu, ({ one }) => ({
  restaurant: one(restaurant, { 
    fields: [menu.restaurantId],
    references: [restaurant.id],
  }),
}));

export const menuItemRelations = relations(menuItems, ({one,many})  =>({
    menu:one(menu,{
      fields:[menuItems.menuId],
      references:[menu.id]
    }),

    menuItemsOnOrdersTable:many(menuItemsOnOrders)
}))

export const menuItemsOnOrdersTableRelations = relations(menuItemsOnOrders, ({ one }) => ({
    menuItem: one(menuItems, {
      fields: [menuItemsOnOrders.menuItemId],
      references: [menuItems.id],
    }),
   order: one(orders, {
      fields: [menuItemsOnOrders.orderId],
      references: [orders.id],
    }),
}))