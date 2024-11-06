import db from "../db/index"
import { eq } from "drizzle-orm"
import {restaurantTable } from "../db/schema"
import { RestaurantStatus, RestaurantType } from "../types"

export class RestaurantRepository{

  async findAll(limit: number = 10, offset: number = 0) {
        return await db.select()
            .from(restaurantTable)
            .limit(limit)
            .offset(offset)
            .execute();
    }
    
    async findRestaurantByLocation(location:string,limit: number =10, offset: number = 0){
        return await db.select()
                        .from(restaurantTable)
                        .where(eq(restaurantTable.location,location ))
                        .limit(limit)
                        .offset(offset)
                        .execute()
    }

    async findOne(id:string){
        const result = await db.select().from(restaurantTable).where(eq(restaurantTable.id,id )).execute()

        return result.length > 0 ? result[0] : null 
    }

    async findVerifiedRestaurants(limit: number =10, offset: number = 0){
        return await db.select().from(restaurantTable)
                        .where(eq(restaurantTable.status, RestaurantStatus.VERIFIED))
                        .limit(limit)
                        .offset(offset)
                        .execute()
                    }

    async findPendingRestaurantRequests(limit: number =10, offset: number = 0){
        return await db.select()
                        .from(restaurantTable)
                        .where(eq(restaurantTable.status, RestaurantStatus.PENDING))
                        .limit(limit)
                        .offset(offset)
                        .execute()
    }

    async createRestaurants(restaurant:RestaurantType){
        const doesRestaurantExists = await db.select().from(restaurantTable).where(eq(restaurantTable.name, restaurant.name)).execute()

        if(doesRestaurantExists) return new Error("Restaurant Name exists")

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