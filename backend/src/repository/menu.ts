import db from "../db/index"
import { eq } from "drizzle-orm"
import {restaurant, menu } from "../db/schema"
import { MenuType } from "../types"

export async function getAllRestaurantsMenu (restaurantId:string){
    const result =  await db.select()
                    .from(menu)
                    .where(eq(menu.restaurantId, restaurantId))
                    .execute()

    return result.length > 0 ? result[0] : null 
}

export async function getMenuById(menuId:string){
    return await db.select().from(menu).where(eq(menu.id, menuId)).execute()
}

export async function getAllMenus(limit: number = 10, offset: number = 0){
    return await db.select()
                    .from(menu)
                    .limit(limit)
                    .offset(offset)
                    .execute();
}

export async function createMenu(data:MenuType){
    const doesMenuExists = await db.select().from(menu).where(eq(menu.name, data.name)).execute()
    if(doesMenuExists) return new Error("Menu Name exists")
    return await db.insert(menu).values(data).returning()
}

export async function deleteMenu(menuId:string){
    return await db.delete(menu)
                    .where(eq(menu.id, menuId))
                    .returning()          
}






