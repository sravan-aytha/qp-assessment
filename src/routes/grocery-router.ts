import { Router } from "express";
import GroceryController from "../controllers/groceryController";
const router = Router()

export const createGroceryRouter = (controller:GroceryController)=>{
    const router = Router()

    router.post('/addItem',controller.addGroceryItem)
    router.get('/getGroceries',controller.getGroceryItems)
    router.get('/updateGroceryQuantity',controller.updateGroceryItemQuantity)
    router.get('/updateGroceryDetails',controller.updateGroceryDetails)
    router.get('/deleteGroceryItem',controller.deleteGroceryItem)

    return router
}