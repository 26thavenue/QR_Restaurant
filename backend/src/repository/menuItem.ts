import db from "../db/index"
import { asc, desc, eq,sql  } from "drizzle-orm"
import {menuItems } from "../db/schema"
import { MenuItemType } from "../types"

export async function getItemsByCategories(category:any ){
    return await db.select().from(menuItems).where(eq(menuItems.categories,category)).execute()
}

export async function buyItem(itemId: string) {
  return await db.transaction(async (tx) => {
    const item = await tx.select({ stock: menuItems.stock })
      .from(menuItems)
      .where(eq(menuItems.id, itemId))
      .then(rows => rows[0]); 

    if (!item) {
      throw new Error('Item not found');
    }

    if (item.stock <= 0) {
      throw new Error('Insufficient stock');
    }

    await tx.update(menuItems)
      .set({
        stock: sql`${menuItems.stock} - 1`,   
        numberOrdered: sql`${menuItems.numberOrdered} + 1`, 
      })
      .where(eq(menuItems.id, itemId));
  });
}

export async function getItemsById(id:string ){
    return await db.select().from(menuItems).where(eq(menuItems.id,id)).execute()
}

export async function updateMenuItem(itemId:string, data:MenuItemType){
    return await db.update(menuItems).set(data).where(eq(menuItems.id, itemId)).execute()
}

export async function deleteMenuItem( itemId:string){
    return await db.delete(menuItems).where(eq(menuItems.id, itemId)).execute()
}

export async function sortItemsByPrice(){
    return await db.select().from(menuItems).orderBy(asc(menuItems.price))
}

export async function getItemsByRestaurant(restaurantId:string){
    return await db.select().from(menuItems).where(eq(menuItems.restaurantId,restaurantId))
}

export async function sortItemsByRating(){
    return await db.select().from(menuItems).orderBy(desc(menuItems.price)).execute()
}

// export async function updateStock(newStock:number , itemId:string){
//     return await db.update(menuItems).set({stock:newStock}).where(eq(menuItems.id, itemId)).execute()
// }
