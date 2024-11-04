import db from "../db/index"
import { eq } from "drizzle-orm"
import {menuItemsTable } from "../db/schema"

export class MenuItemRepository{
    async getItemsByCategories(category:string | string[]){}

    async updateMenuItem(menuId:string, iremId:string){}

    async deleteMenuItem(menuId:string, iremId:string){}

    async getItemsByPrice(upperLimit:number , lowerlimit:number =0){}

    async getItemsByRestaurant(){}

    async getItemsByRating(){}

    async updateStock(){}
}