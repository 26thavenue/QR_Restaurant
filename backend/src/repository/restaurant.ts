import db from "../db/index"
import { eq } from "drizzle-orm"
import {restaurantTable } from "../db/schema"
import { RestaurantStatus, RestaurantType } from "../../types"

export class RestaurantRepository{
    async findAll(){
        return await db.select().from(restaurantTable).execute()
    }

    async findOne(id:string){
        return await db.select().from(restaurantTable).where(eq(restaurantTable.id,id )).execute()
    }

    async findVerifiedRestaurants(){
        return await db.select().from(restaurantTable).where(eq(restaurantTable.status, RestaurantStatus.VERIFIED)).execute()
    }

    async findPendingRestaurantRequests(){
        return await db.select().from(restaurantTable).where(eq(restaurantTable.status, RestaurantStatus.PENDING)).execute()
    }

    async createRestaurants(restaurant:RestaurantType){
        return await db.insert(restaurantTable).values(restaurant).returning()
    }

    async approvePendingRequest(id:string){
        return await db.update(restaurantTable)
                        .set({ status: RestaurantStatus.APPROVED })
                        .where(eq(restaurantTable.id, id))
                        .returning();
    }

    async approveVerifiedRequest(id:string){
        return await db.update(restaurantTable)
                        .set({ status: RestaurantStatus.VERIFIED })
                        .where(eq(restaurantTable.id, id))
                        .returning();
    }

    async deleteRestaurant(id:string){
        return await db.delete(restaurantTable)
                        .where(eq(restaurantTable.id, id))
                        .returning();
    }
}