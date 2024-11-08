import db from "../db/index"
import { asc, desc, eq } from "drizzle-orm"
import {menuItemsTable } from "../db/schema"
import { MenuItemType } from "../types"

export async function getItemsByCategories(category:string ){
    return await db.select().from(menuItemsTable).where(eq(menuItemsTable.categories,category)).execute()
}

export async function updateMenuItem(itemId:string, menuItems:MenuItemType){
    return await db.update(menuItemsTable).set(menuItems).where(eq(menuItemsTable.id, itemId)).execute()
}

export async function deleteMenuItem( itemId:string){
    return await db.delete(menuItemsTable).where(eq(menuItemsTable.id, itemId)).execute()
}

export async function getItemsByPrice(){
    return await db.select().from(menuItemsTable).orderBy(asc(menuItemsTable.price))
}

export async function getItemsByRestaurant(restaurantId:string){
    return await db.select().from(menuItemsTable).where(eq(menuItemsTable.restaurantId,restaurantId))
}

export async function getItemsByRating(){
    return await db.select().from(menuItemsTable).orderBy(desc(menuItemsTable.price)).execute()
}

export async function updateStock(newStock:number , itemId:string){
    return await db.update(menuItemsTable).set({stock:newStock}).where(eq(menuItemsTable.id, itemId)).execute()
}
