import { menuItemsSchema } from './../utils/schema';
import * as menuItemsRepository from "../repository/menuItem"
import {type Request, type Response } from "express"
import { ErrorMiddleware } from "../middlewares/errorMiddleware";
import { validateWithSchema } from "../middlewares/zodValidator";

export const getItemByCategories = async(req:Request, res:Response) =>{
    const category = req.query.category as string
     if(!category){
        const error = new ErrorMiddleware( 'Category is required',400)
         res.json(error.message).status(error.statusCode)
    }
    try {
        const items = await menuItemsRepository.getItemsByCategories(category)

        if(items.length === 0) {
             res.status(200).json({
                "message":"No Items in this category"
            })
        }

         res.status(200).json({
            "message":"Request completed successfully",
            "data":items
        })
    } catch (error) {
        console.error("Error fetching items:", error);
         res.status(500).json({ message: "An error occurred", error });
    }

}

export const sortItemsByRating = async(req:Request, res:Response) =>{
    try {
        const items = await menuItemsRepository.sortItemsByRating()

         res.status(200).json({
            "message":"Request completed successfully",
            "data":items
        })
    } catch (error) {
        console.error("Error fetching items:", error);
         res.status(500).json({ message: "An error occurred", error });
    }
    
}

export const sortItemsByPrice = async(req:Request, res:Response) =>{
     try {
        const items = await menuItemsRepository.sortItemsByPrice()

         res.status(200).json({
            "message":"Request completed successfully",
            "data":items
        })
    } catch (error) {
        console.error("Error fetching items:", error);
         res.status(500).json({ message: "An error occurred", error });
    }
}

export const getRestaurantItems = async(req:Request, res:Response) =>{
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware( 'ID is required',400)
         res.json(error.message).status(error.statusCode)
    }

    try {
        const items = await menuItemsRepository.getItemsByRestaurant(id)

        if(items.length === 0) {
             res.status(200).json({
                "message":"No Items in this category"
            })
        }

         res.status(200).json({
            "message":"Request completed successfully",
            "data":items
        })
        
    } catch (error) {
        console.error("Error fetching items:", error);
         res.status(500).json({ message: "An error occurred", error });
    } 
}

export const updateItems = async(req:Request, res:Response) =>{
    const {id} = req.params

    const body = req.body

    const validatedBody = validateWithSchema(menuItemsSchema,body)

    if(validatedBody.error){
         res.status(400).json(validatedBody.error) 
    }

    if(!id){
        const error = new ErrorMiddleware( 'ID is required',400)
         res.json(error.message).status(error.statusCode)
    }

    try {
        const items = await menuItemsRepository.updateMenuItem(id,body)

         res.status(200).json({
            "message":"Requested completed successfully",
            "data": items
        })
    } catch (error) {
         console.error("Error fetching items:", error);
         res.status(500).json({ message: "An error occurred", error });  
    }
}