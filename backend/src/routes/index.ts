import restaurantRouter from "./restaurant";
import orderRouter from "./orders"
import menuRouter from "./menu"
import itemRouter from "./menuItem"
import { Router } from "express";

const router = Router()

router.use("/restaurant", restaurantRouter)
router.use("/menu", menuRouter)
router.use("/orders", orderRouter)
router.use("/item", itemRouter)

export default router