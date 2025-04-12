import GroceryController from "./controllers/groceryController"
import Database from "./database/database"
import BaseRepository from "./repositories/base-repository"
import GroceryRepository from "./repositories/grocery-repository"
import { createGroceryRouter } from "./routes/grocery-router"
import GroceryService from "./services/grocery-services"

export const startup = async()=>{
    const dbConnection  = await new Database().getInstance()

    const baseRepository = new BaseRepository(dbConnection)

    const groceryRepository = new GroceryRepository(baseRepository)

    const groceryService = new GroceryService(groceryRepository)
    const groceryController = new GroceryController(groceryService)
    const groceryRouter = createGroceryRouter(groceryController)

    // need to change as the di class
    return {
        groceryRouter
    }
}