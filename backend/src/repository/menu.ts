import db from "../db/index"
import { eq } from "drizzle-orm"
import {restaurantTable, menuTable } from "../db/schema"
import { MenuType } from "../types"

export async function getAllRestaurantsMenu (restaurantId:string){
    const result =  await db.select()
                    .from(menuTable)
                    .where(eq(menuTable.restaurantId, restaurantId))
                    .execute()

    return result.length > 0 ? result[0] : null 
}

export async function getAllMenus(limit: number = 10, offset: number = 0){
    return await db.select()
                    .from(menuTable)
                    .limit(limit)
                    .offset(offset)
                    .execute();
}

export async function createMenu(menu:MenuType){
    const doesMenuExists = await db.select().from(menuTable).where(eq(menuTable.name, menu.name)).execute()
    if(doesMenuExists) return new Error("Menu Name exists")
    return await db.insert(menuTable).values(menu).returning()
}

export async function deleteMenu(menuId:string){
    return await db.delete(menuTable)
                    .where(eq(menuTable.id, menuId))
                    .returning()          
}






