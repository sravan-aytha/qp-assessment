import AuthController from "controllers/authcontroller";
import { Router } from "express";
import UserController from "src/controllers/user-controller";
const router = Router()

export const createUserRouter = (controller:UserController,authcontroller:AuthController)=>{
    const router = Router()

    router.post('/registerUser',controller.createUser)
    router.post('/loginUser',controller.loginUser)
    router.get('/getUserById',authcontroller.decode,controller.getUserById)
    router.get('/getAllUsers',authcontroller.decode,controller.getAllUsers)
    router.get('/changeUserPassword',authcontroller.decode,controller.changeUserPassword)
    router.get('/updateUserName',authcontroller.decode,controller.updateUserName)
    router.get('/deleteUser',authcontroller.decode,controller.deleteUser)

    return router
}