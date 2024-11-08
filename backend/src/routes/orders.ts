import {Router} from "express"
import * as orderController from "../controllers/order"

const orderRouter = Router()

orderRouter.get("/", orderController.getAllOrders)
orderRouter.get("/restaurant/:id", orderController.getRestaurantOrders)
orderRouter.get("/time", orderController.getAllOrdersWTR)
orderRouter.get("/restaurant/time/:id", orderController.getAllRestaurantOrdersWTR)
orderRouter.post("/", orderController.createOrder)
orderRouter.delete("/:id", orderController.deleteOrder)

export default orderRouter