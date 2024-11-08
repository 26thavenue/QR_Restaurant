import { type Request, type Response } from "express";
import {ErrorMiddleware} from "../middlewares/errorMiddleware"
import { validateWithSchema } from '../middlewares/zodValidator';
import * as menuRepository from "../repository/menu"
import { menuSchema } from "../utils/schema";

export const  getAllMenus = async (req: Request, res: Response) =>{
     try {
        const limit = parseInt(req.query.limit as string, 10);
        const offset = parseInt(req.query.offset as string, 10);
        const menus = await menuRepository.getAllMenus(
                            isNaN(limit) ? undefined : limit,
                            isNaN(offset) ? undefined : offset
                            );

         res.status(200).json({
            message: "Request completed successfully",
            data: menus,
        })
    } catch (error) {
        console.error("Error fetching menus:", error);
         res.status(500).json({ message: "An error occurred", error });
    }
}

export const getMenuById = async(req: Request, res: Response) =>{
    const {id} = req.params
    try {

        if(!id){
            const error = new ErrorMiddleware( 'ID is required',400)
             res.json(error.message).status(error.statusCode)
        }

        const menu = await menuRepository.getMenuById(id)

         res.status(200).json({
            message: "Request completed successfully",
            data: menu,
        })
  } catch (error) {
      console.error("Error fetching orders:", error);
       res.status(500).json({ message: "An error occurred", error });
  }

}

export const  createMenu = async (req: Request, res: Response) =>{
    const body = req.body

    try {

    const validatedBody = validateWithSchema(menuSchema, body);

    if(validatedBody.error){
       res.status(400).json(validatedBody.error) 
    }

    const newMenu = await menuRepository.createMenu(body)

     res.status(201).json({
        message: "Request completed successfully",
        data: newMenu,
      })
    
  } catch (error) {
         console.error("Error fetching menus:", error);
          res.status(500).json({ message: "An error occurred", error });
  }
}
export const  getAllRestaurantMenu = async (req: Request, res: Response) =>{
    const {id} = req.params
    try {

        if(!id){
            const error = new ErrorMiddleware( 'ID is required',400)
             res.json(error.message).status(error.statusCode)
        }

        const menus = await menuRepository.getAllRestaurantsMenu(id)

         res.status(200).json({
            message: "Request completed successfully",
            data: menus,
        })
  } catch (error) {
      console.error("Error fetching orders:", error);
       res.status(500).json({ message: "An error occurred", error });
  }


}
export const deleteMenu = async (req: Request, res: Response) =>{
    const {id} = req.params
    try {

        if(!id){
            const error = new ErrorMiddleware( 'ID is required',400)
             res.json(error.message).status(error.statusCode)
        }

        const menu= await menuRepository.deleteMenu(id)

        if(menu.length === 0 ){
            const error = new ErrorMiddleware( 'Invalid ID',400)
             res.json(error.message).status(error.statusCode)
        }

         res.status(200).json({
                message: "Request completed successfully",
            })

  } catch (error) {
      console.error("Error fetching orders:", error);
       res.status(500).json({ message: "An error occurred", error });
  }
}
