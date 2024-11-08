import {Router} from "express"
import * as ItemController from "../controllers/menuItem"

const itemRouter = Router()

itemRouter.get("/", ItemController.getItemByCategories)
itemRouter.get("/price", ItemController.sortItemsByPrice)
itemRouter.get("/rating", ItemController.sortItemsByRating)
itemRouter.get("/:id", ItemController.updateItems)
itemRouter.get("/restaurant/:id", ItemController.getRestaurantItems)

export default itemRouter