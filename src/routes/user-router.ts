import { Router } from "express";
import UserController from "src/controllers/user-controller";
const router = Router()

export const createUserRouter = (controller:UserController)=>{
    const router = Router()

    router.post('/registerUser',controller.createUser)
    router.get('/loginUser',controller.loginUser)
    router.get('/getUserById',controller.getUserById)
    router.get('/getAllUsers',controller.getAllUsers)
    router.get('/changeUserPassword',controller.changeUserPassword)
    router.get('/updateUserName',controller.updateUserName)
    router.get('/deleteUser',controller.deleteUser)

    return router
}