import { Router } from "express";
import GroceryController from "../controllers/grocery-controller";
import { checkIsAdmin } from "src/middlewares/admin-check";
import AuthController from "controllers/authcontroller";
const router = Router()

export const createGroceryRouter = (controller:GroceryController,authController:AuthController)=>{
    const router = Router()

    router.post('/addItem',authController.decode,checkIsAdmin,controller.addGroceryItem)
    router.get('/getGroceries',authController.decode,controller.getGroceryItems)
    router.get('/updateGroceryQuantity',authController.decode,checkIsAdmin,controller.updateGroceryItemQuantity)
    router.get('/updateGroceryDetails',authController.decode,checkIsAdmin,controller.updateGroceryDetails)
    router.get('/deleteGroceryItem',authController.decode,checkIsAdmin,controller.deleteGroceryItem)

    return router
}