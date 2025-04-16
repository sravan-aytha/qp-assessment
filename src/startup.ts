import UserRepository from "repositories/user-repositoy"
import GroceryController from "controllers/grocery-controller"
import UserController from "controllers/user-controller"
import Database from "database/database"
import BaseRepository from "repositories/base-repository"
import GroceryRepository from "repositories/grocery-repository"
import GroceryService from "services/grocery-services"
import Userservice from "services/user-service"
import { createGroceryRouter } from "routers/grocery-router"
import { createUserRouter } from "routers/user-router"
import AuthController from "controllers/authcontroller"

export const startup = async()=>{
    const dbConnection  = await new Database().getInstance()

    const baseRepository = new BaseRepository(dbConnection)

    const groceryRepository = new GroceryRepository(baseRepository)
    const userRepository = new UserRepository(baseRepository)

    const groceryService = new GroceryService(groceryRepository)
    const userService = new Userservice(userRepository)

    const groceryController = new GroceryController(groceryService)
    const authController  = new AuthController()
    const userController = new UserController(userService,authController)

    
    const groceryRouter = createGroceryRouter(groceryController,authController)
    const userRouter = createUserRouter(userController,authController)

    // need to change as the di class
    return {
        groceryRouter,
        userRouter
    }
}