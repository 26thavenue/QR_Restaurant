import db from "../db/index"
import { eq } from "drizzle-orm"
import {ordersTable, menuItemsTable,menuItemsOnOrdersTable } from "../db/schema"
import { OrdersType } from "../types"
import { and, gte, lte } from 'drizzle-orm';

export async function getAllOrdersWithinATimeRange(startTime: Date, endTime: Date, limit: number = 10,  offset: number = 0) {
    return await db.select()
        .from(ordersTable)
        .where(
            and(
                gte(ordersTable.createdAt, startTime),
                lte(ordersTable.createdAt, endTime)
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
    .from(ordersTable)
    .innerJoin(menuItemsOnOrdersTable, eq(menuItemsOnOrdersTable.orderId, ordersTable.id))
    .innerJoin(menuItemsTable, eq(menuItemsTable.id, menuItemsOnOrdersTable.menuItemId))
    .where(
      and(
        eq(menuItemsTable.restaurantId, restaurantId), 
        gte(ordersTable.createdAt, startTime),         
        lte(ordersTable.createdAt, endTime)           
      )
    )
    .limit(limit)
    .offset(offset)
    .execute();
}

export async function createOrder(order:OrdersType){
    return await db.insert(ordersTable).values(order).returning()
}

export async function getAllOrders(limit: number = 10, offset: number = 0){
    return await db.select()
            .from(ordersTable)
            .limit(limit)
            .offset(offset)
            .execute();
}

export async function deleteOrders(id:string){
     return await db.delete(ordersTable)
                        .where(eq(ordersTable.id, id))
                        .returning();
}