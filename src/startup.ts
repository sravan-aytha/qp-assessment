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
import OrderRepository from "repositories/order-repository"
import OrderService from "services/order-service"
import Ordercontroller from "controllers/order-controller"
import { createOrderRouter } from "routers/order-router"

export const startup = async()=>{

    // a Dependency injection

    const dbConnection  = await new Database().getInstance()

    const baseRepository = new BaseRepository(dbConnection)

    const groceryRepository = new GroceryRepository(baseRepository)
    const userRepository = new UserRepository(baseRepository)
    const orderRepo = new OrderRepository(baseRepository)

    const groceryService = new GroceryService(groceryRepository)
    const userService = new Userservice(userRepository)
    const orderService = new OrderService(orderRepo,userService,groceryService)
    
    const authController  = new AuthController()

    const groceryController = new GroceryController(groceryService)
    const userController = new UserController(userService,authController)
    const ordercontroller = new Ordercontroller(orderService)

    
    const groceryRouter = createGroceryRouter(groceryController,authController)
    const userRouter = createUserRouter(userController,authController)
    const orderRouter = createOrderRouter(ordercontroller,authController)
    // need to change as the di class
    return {
        groceryRouter,
        userRouter,
        orderRouter
    }
}