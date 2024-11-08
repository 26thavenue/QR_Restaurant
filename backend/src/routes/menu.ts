import { Router } from "express";
import * as menuController from "../controllers/menu"

const menuRouter = Router()

menuRouter.get("/", menuController.getAllMenus)
menuRouter.get("/:id", menuController.getMenuById)
menuRouter.get("/restaurant/:id", menuController.getAllRestaurantMenu)
menuRouter.post("/", menuController.createMenu)
menuRouter.delete("/:id", menuController.deleteMenu)

export default menuRouter