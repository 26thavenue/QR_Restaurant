import { z } from "zod";
import { FoodCategories, MenuItemType,MenuType, RestaurantType,OrdersType } from "../types";

export const RestaurantSchema:z.ZodType<RestaurantType> = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().optional(),
  description: z.string().min(10, "Description is required and should be more than 10 words")
});

export const menuSchema:z.ZodType<MenuType> = z.object({
  name: z.string().min(3, "Name is required"),
  restaurantId: z.string().min(1, "Restaurant ID is required"),
})

export const menuItemsSchema:z.ZodType<MenuItemType> = z.object({
  name: z.string().min(3, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  categories: z.enum(Object.values(FoodCategories) as [FoodCategories, ...FoodCategories[]]),
  description: z.string(),
  stock: z.number().min(0),
  timeTakenToPrepare:z.string(),
  restaurantId: z.string().min(3, "Restaurant ID is required"),
  menuId: z.string().min(3, "Menu ID is required"),
})

export const orderSchema:z.ZodType<OrdersType>  = z.object({
  name: z.string().min(3, "Name is required"),
  totalPrice: z.number().min(0, "Price must be a positive number"),
})