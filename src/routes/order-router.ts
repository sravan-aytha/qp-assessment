import AuthController from "controllers/authcontroller";
import ordercontroller from "controllers/order-controller";
import { Router } from "express";

const router = Router()

export const createOrderRouter = (controller:ordercontroller,authController:AuthController)=>{
    const router = Router()

    router.post('/createOrder',authController.decode,controller.createOrder)
    router.get('/getOrdersbyUser',authController.decode,controller.getOrdersbyUser)
    
    return router
}