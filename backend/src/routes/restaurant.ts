import express from "express";
import  * as restaurantController from "../controllers/restaurant";

const restaurantRouter = express.Router();

restaurantRouter.get('/', restaurantController.getRestaurants)
restaurantRouter.get('/:id', restaurantController.getRestaurantById)
restaurantRouter.get('/pending', restaurantController.getPendingRestaurants)
// restaurantRouter.get('/loc', restaurantController.getPendingRestaurants)
restaurantRouter.get('/verified', restaurantController.getVerifiedRestaurants)
restaurantRouter.post('/', restaurantController.createRestaurant)
restaurantRouter.put('/pending/:id', restaurantController.approvePendingRestaurants)
restaurantRouter.put('/verify/:id', restaurantController.approveVerifiedRestaurants)
restaurantRouter.delete('/:id', restaurantController.deleteRestaurant)

export default restaurantRouter;
