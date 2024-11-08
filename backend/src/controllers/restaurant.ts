import { type Request, type Response, RequestHandler } from "express";
import  * as restaurantRepository  from "../repository/restaurant";
import {ErrorMiddleware} from "../middlewares/errorMiddleware"
import { validateWithSchema } from '../middlewares/zodValidator';
import { RestaurantSchema } from '../utils/schema';


export const getRestaurants= async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string, 10);
    const offset = parseInt(req.query.offset as string, 10);

    const restaurants = await restaurantRepository.findAll(
      isNaN(limit) ? undefined : limit,
      isNaN(offset) ? undefined : offset
    );
    return res.status(200).json({
      message: "Request completed successfully",
      data: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export const getVerifiedRestaurants = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string, 10);
    const offset = parseInt(req.query.offset as string, 10);

    const restaurants = await restaurantRepository.findVerifiedRestaurants(
      isNaN(limit) ? undefined : limit,
      isNaN(offset) ? undefined : offset
    );

    return res.status(200).json({
      message: "Request completed successfully",
      data: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export const getPendingRestaurants = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string, 10);
    const offset = parseInt(req.query.offset as string, 10);

    const restaurants = await restaurantRepository.findPendingRestaurantRequests(
      isNaN(limit) ? undefined : limit,
      isNaN(offset) ? undefined : offset
    );

    return res.status(200).json({
      message: "Request completed successfully",
      data: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export const getRestaurantsByLocation = async (req: Request, res: Response) => {
  try {
    const location = req.query.location as string
    const limit = parseInt(req.query.limit as string, 10);
    const offset = parseInt(req.query.offset as string, 10);

    if(!location){
        const error = new ErrorMiddleware( 'Location is required',400)
        return res.json(error.message).status(error.statusCode)
    }

    const restaurants = await restaurantRepository.findPendingRestaurantRequests(
      isNaN(limit) ? undefined : limit,
      isNaN(offset) ? undefined : offset
    );

    return res.status(200).json({
      message: "Request completed successfully",
      data: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
     const {id} = req.params

     if(!id){
        const error = new ErrorMiddleware( 'ID is required',400)
        return res.json(error.message).status(error.statusCode)
     }

    const restaurant = await restaurantRepository.findOne(id.toString())

    if (!restaurant) {
        return res.status(404).json({
            message: "Restaurant not found",
            error: `No restaurant found with ID ${id}`
        });
    }

    return res.status(200).json({
      message: "Request completed successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export const approvePendingRestaurants = async (req: Request, res: Response) => {
  const {id} = req.params
  if(!id){
      const error = new ErrorMiddleware( 'ID is required',400)
      return res.json(error.message).status(error.statusCode)
  }

  try {
    const restaurant = await restaurantRepository.approveVerifiedRequest(id)

    return res.status(200).json({
      message: "Yayy, You have been approved !!",
      data: restaurant,
    });


  } catch (error) {
      console.error("Error fetching restaurant:", error);
      return res.status(500).json({ message: "An error occurred", error });
  }

}

export const approveVerifiedRestaurants = async (req: Request, res: Response) => {
  const {id} = req.params
  if(!id){
      const error = new ErrorMiddleware( 'ID is required',400)
      return res.json(error.message).status(error.statusCode)
  }

  try {
    const restaurant = await restaurantRepository.approveVerifiedRequest(id)

    return res.status(200).json({
      message: "Yayy You have been verified !!",
      data: restaurant,
    });


  } catch (error) {
      console.error("Error fetching restaurant:", error);
      return res.status(500).json({ message: "An error occurred", error });
  }

}

export const createRestaurant = async (req: Request, res: Response) => {

  const body = req.body

  try {

    const validatedBody = validateWithSchema(RestaurantSchema, body);

    if(validatedBody.error){
      return res.status(400).json(validatedBody.error) 
    }


    const newRestaurant = await restaurantRepository.createRestaurants(body)

    return res.status(201).json({
        message: "Request completed successfully",
        data: newRestaurant,
      })
    
  } catch (error) {
         console.error("Error fetching restaurant:", error);
         return res.status(500).json({ message: "An error occurred", error });
  }

}
