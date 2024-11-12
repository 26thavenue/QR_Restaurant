import { menuItems, menu, orders } from "./db/schema";
import { InferSelectModel } from "drizzle-orm";

type BaseMenuItemType = InferSelectModel<typeof menuItems>;

type BaseOrderType = InferSelectModel<typeof orders>

// Utility to apply Partial to certain keys
type Partialize<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export enum RestaurantStatus {
    PENDING = "pending",
    VERIFIED = "verified",
    APPROVED = "approved"
}

export type RestaurantType = {
    name:string
    status?: RestaurantStatus
    id?: string
    location?:string
    description:string,
}

export type MenuType = Omit<Omit<InferSelectModel<typeof menu>,"id">, "createdAt">

export type MenuItemType = Partialize<
                                    Omit<BaseMenuItemType, "id" | "createdAt" | "rating" | "numberOrdered">,
                                    "isDiscount" | "discountPercent"
                                    >;


export type OrdersType = Partialize<
                                    Omit<BaseOrderType, "id" | "createdAt" >,
                                    "updatedAt"
                                    >;

export enum FoodCategories {
    DRINKS = 'drinks',
    SNACKS = "SNACKS",
    GRILL = "grill",
    DESSERTS = "desserts",
    VEGAN ="vegan",
    SIDES ="sides",
    MAIN_COURSES ="main courses",
    SOUPS ="soups",
    SALAD = "salad",
    OTHER = "other",
    APPETIZERS ="appetizers",
    OTHERS ="others"
}

