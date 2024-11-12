import * as orderRepository from "../repository/order"
import * as restaurantRepository from "../repository/restaurant"
import {type Request, type Response } from "express"
import { validateWithSchema } from '../middlewares/zodValidator';
import { ErrorMiddleware } from "../middlewares/errorMiddleware";
import { isValidDate } from "../utils/util";
import { orderSchema } from "../utils/schema";
import { buyItem } from '../repository/menuItem';

export const getAllOrders = async(req: Request, res: Response) =>{
    try {
        const limit = parseInt(req.query.limit as string, 10);
        const offset = parseInt(req.query.offset as string, 10);
        const orders = await orderRepository.getAllOrders(
                            isNaN(limit) ? undefined : limit,
                            isNaN(offset) ? undefined : offset
                        );

         res.status(200).json({
            message: "Request completed successfully",
            data: orders,
        })
    } catch (error) {
        console.error("Error fetching orders:", error);
         res.status(500).json({ message: "An error occurred", error });
    }
}

export const getRestaurantOrders= async(req: Request, res: Response) => {
    const {id} = req.params
    const limit = parseInt(req.query.limit as string, 10);
    const offset = parseInt(req.query.offset as string, 10);

    if(!id){
        const error = new ErrorMiddleware( 'ID is required',400)
         res.json(error.message).status(error.statusCode)
    }

    try {

        const isRestaurant = await restaurantRepository.findOne(id)

        if(!isRestaurant) {
            const error = new ErrorMiddleware( 'The Restaurant des not exist',400)
             res.json(error.message).status(error.statusCode)
        }

        const orders = await orderRepository.getRestaurantOrders(
                                id,
                                isNaN(limit) ? undefined : limit,
                                isNaN(offset) ? undefined : offset
                            )

         res.status(200).json(orders)
    } catch (error) {
        console.error("Error fetching ordrs:", error);
         res.status(500).json({ message: "An error occurred", error });
    }
}

//Get all Orders Within a Time Rnge

export const getAllOrdersWTR = async(req: Request, res: Response) => {
     try {
        const limit = parseInt(req.query.limit as string, 10);
        const offset = parseInt(req.query.offset as string, 10);

        const startDate = req.query.startDate as string

        const endDate = req.query.endDate as string

        // CONVERT STRING TO A DATE AND CHECK IF IT HAS A VALID DATE FORMAT

        if(isValidDate(startDate) || isValidDate(endDate) ){
             const error = new ErrorMiddleware( 'Invalid Date Format',400)
             res.json(error.message).status(error.statusCode)
        }

        const orders = await orderRepository.getAllOrdersWithinATimeRange(
                            new Date(startDate),
                            new Date(endDate),
                            isNaN(limit) ? undefined : limit,
                            isNaN(offset) ? undefined : offset
                            );


         res.status(200).json({
            message: "Request completed successfully",
            data: orders,
        })
    } catch (error) {
        console.error("Error fetching orders:", error);
         res.status(500).json({ message: "An error occurred", error });
    }
}

// GET ALL RESTAURANTS WITHIN A TIME RANGE

export const getAllRestaurantOrdersWTR = async(req: Request, res: Response) => {
    const {id} = req.params

     if(!id){
        const error = new ErrorMiddleware( 'ID is required',400)
         res.json(error.message).status(error.statusCode)
    }

    try {
        const limit = parseInt(req.query.limit as string, 10);
        const offset = parseInt(req.query.offset as string, 10);

        const startDate = req.query.startDate as string

        const endDate = req.query.endDate as string

        if(isValidDate(startDate) || isValidDate(endDate) ){
             const error = new ErrorMiddleware( 'Invalid Date Format',400)
             res.json(error.message).status(error.statusCode)
        }

        const orders = await orderRepository.getRestaurantOrdersWithinTimeRange(
                            id,
                            new Date(startDate),
                            new Date(endDate),
                            isNaN(limit) ? undefined : limit,
                            isNaN(offset) ? undefined : offset
                            );


         res.status(200).json({
            message: "Request completed successfully",
            data: orders,
        })
    } catch (error) {
        console.error("Error fetching orders:", error);
         res.status(500).json({ message: "An error occurred", error });
    }
}

export const createOrder = async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const validatedBody = validateWithSchema(orderSchema, body);
        if (validatedBody.error) {
            return res.status(400).json(validatedBody.error);
        }
        for (const item of body.items) {
            await buyItem(item.itemId);
        }
        const newOrder = await orderRepository.createOrder(body);

        res.status(201).json({
            message: "Request completed successfully",
            data: newOrder,
        });
        
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
};

// export const createOrder = async (req: Request, res: Response) => {
//     const body = req.body;

//     try {
//         // Validate the request body with the schema
//         const validatedBody = validateWithSchema(orderSchema, body);

//         if (validatedBody.error) {
//             return res.status(400).json(validatedBody.error);
//         }

//         // Begin a transaction for the order and stock updates
//         const newOrder = await db.transaction(async (tx) => {
//             // Process each item in the order
//             for (const item of body.items) {
//                 // Decrease stock and increase number ordered for each item
//                 await buyItem(item.id); // Assumes `buyItem` is already set up for transaction
//             }

//             // After all items are processed, create the order
//             return await orderRepository.createOrder(tx, body);
//         });

//         // Respond with the newly created order data
//         res.status(201).json({
//             message: "Order created successfully",
//             data: newOrder,
//         });

//     } catch (error) {
//         console.error("Error creating order:", error);
//         res.status(500).json({ message: "An error occurred", error });
//     }
// };

export const deleteOrder = async (req:Request,res:Response) =>{
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware( 'ID is required',400)
         res.json(error.message).status(error.statusCode)
    }
    try {
        const order= await orderRepository.deleteOrder(id)

        if(order.length === 0 ){
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