import { Router } from "express";
import GroceryController from "../controllers/groceryController";
const router = Router()

export const createGroceryRouter = (controller:GroceryController)=>{
    const router = Router()

    router.use('/addItem',controller.addGroceryItem)

    return router
}