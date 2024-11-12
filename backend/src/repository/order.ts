import db from "../db/index"
import { eq } from "drizzle-orm"
import {orders, menuItems,menuItemsOnOrders } from "../db/schema"
import { OrdersType } from "../types"
import { and, gte, lte } from 'drizzle-orm';

export async function getAllOrdersWithinATimeRange(startTime: Date, endTime: Date, limit: number = 10,  offset: number = 0) {
    return await db.select()
        .from(orders)
        .where(
            and(
                gte(orders.createdAt, startTime),
                lte(orders.createdAt, endTime)
            )
        )
        .limit(limit)
        .offset(offset)
        .execute();
}


export async function getRestaurantOrdersWithinTimeRange(
  restaurantId: string,
  startTime: Date,
  endTime: Date,
  limit: number = 10, 
  offset: number = 0
) {
  return await db.select()
    .from(orders)
    .innerJoin(menuItemsOnOrders, eq(menuItemsOnOrders.orderId, orders.id))
    .innerJoin(menuItems, eq(menuItems.id, menuItemsOnOrders.menuItemId))
    .where(
      and(
        eq(menuItems.restaurantId, restaurantId), 
        gte(orders.createdAt, startTime),         
        lte(orders.createdAt, endTime)           
      )
    )
    .limit(limit)
    .offset(offset)
    .execute();
}

export async function getRestaurantOrders(
  restaurantId: string,
  limit: number = 10, 
  offset: number = 0
) {
  return await db.select()
    .from(orders)
    .innerJoin(menuItemsOnOrders, eq(menuItemsOnOrders.orderId, orders.id))
    .innerJoin(menuItems, eq(menuItems.id, menuItemsOnOrders.menuItemId))
    .where(
        eq(menuItems.restaurantId, restaurantId), 
    )
    .limit(limit)
    .offset(offset)
    .execute();
}



export async function createOrder(order:OrdersType){
    return await db.insert(orders).values(order).returning()
}

export async function getAllOrders(limit: number = 10, offset: number = 0){
    return await db.select()
            .from(orders)
            .limit(limit)
            .offset(offset)
            .execute();
}

export async function deleteOrder(id:string){
     return await db.delete(orders)
                        .where(eq(orders.id, id))
                        .returning();
}