import { restaurantRelations } from './../db/schema';
import db from "../db/index"
import { eq, and,inArray  } from "drizzle-orm"
import {restaurant , location} from "../db/schema"
import { RestaurantStatus, RestaurantType } from "../types"

  export async function findAll(limit: number = 10, offset: number = 0) {
        return await db.select()
            .from(restaurant)
            .limit(limit)
            .offset(offset)
            .execute();
    }
    
    export async function findRestaurantByLocation(city:string,state:string,country:string,limit: number =10, offset: number = 0){
        const locations = await db.select()
                        .from(location)
                        .where(
                            and(
                                eq(location.country,country),
                                eq(location.city,city),
                                eq(location.state,state),
                                )
                            )
        const restaurantIds = locations.map(loc => loc.restaurantId);
        const restaurants = await db.select()
                                    .from(restaurant)
                                    .where(inArray(restaurant.id, restaurantIds))
                                    .limit(limit)
                                    .offset(offset);

        return restaurants;
    }

    export async function findOne(id:string){
        const result = await db.select().from(restaurant).where(eq(restaurant.id,id )).execute()

        return result.length > 0 ? result[0] : null 
    }

    export async function findVerifiedRestaurants(limit: number =10, offset: number = 0){
        return await db.select().from(restaurant)
                        .where(eq(restaurant.status, RestaurantStatus.VERIFIED))
                        .limit(limit)
                        .offset(offset)
                        .execute()
                    }

    export async function findPendingRestaurantRequests(limit: number =10, offset: number = 0){
        return await db.select()
                        .from(restaurant)
                        .where(eq(restaurant.status, RestaurantStatus.PENDING))
                        .limit(limit)
                        .offset(offset)
                        .execute()
    }

    export async function createRestaurants(data:RestaurantType){
        
        const doesRestaurantExists = await db.select().from(restaurant).where(eq(restaurant.name, data.name)).execute()

        if(doesRestaurantExists) return new Error("Restaurant Name exists")

        return await db.insert(restaurant).values(data).returning()
    }

    export async function approvePendingRequest(id:string){
        return await db.update(restaurant)
                        .set({ status: RestaurantStatus.APPROVED })
                        .where(eq(restaurant.id, id))
                        .returning();
    }

    export async function approveVerifiedRequest(id:string){
        return await db.update(restaurant)
                        .set({ status: RestaurantStatus.VERIFIED })
                        .where(eq(restaurant.id, id))
                        .returning();
    }

    export async function deleteRestaurant(id:string){
        return await db.delete(restaurant)
                        .where(eq(restaurant.id, id))
                        .returning();
    }
