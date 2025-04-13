import UserRepository from "repositories/user-repositoy"
import GroceryController from "controllers/grocery-controller"
import Database from "database/database"
import BaseRepository from "repositories/base-repository"
import GroceryRepository from "repositories/grocery-repository"
import GroceryService from "services/grocery-services"
import Userservice from "services/user-service"
import UserController from "controllers/user-controller"
import { createGroceryRouter } from "routers/grocery-router"
import { createUserRouter } from "routers/user-router"

export const startup = async()=>{
    const dbConnection  = await new Database().getInstance()

    const baseRepository = new BaseRepository(dbConnection)

    const groceryRepository = new GroceryRepository(baseRepository)
    const userRepository = new UserRepository(baseRepository)

    const groceryService = new GroceryService(groceryRepository)
    const userService = new Userservice(userRepository)

    const groceryController = new GroceryController(groceryService)
    const userController = new UserController()

    const groceryRouter = createGroceryRouter(groceryController)
    const userRouter = createUserRouter(userController)

    // need to change as the di class
    return {
        groceryRouter,
        userRouter
    }
}