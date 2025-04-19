import OrderRepository from "repositories/order-repository";
import { TResponse } from "src/models/general-model";
import { TOrder, TOrderItem } from "src/models/order-model";
import UserService from "./user-service";
import { generateOrderId } from "src/utilities/order-utility";
import GroceryService from "./grocery-services";
import { GROCERY_QUANTITY_UPDATE_TYPE } from "src/models/grocery-model";

class OrderService{
    private _orderRepository:OrderRepository
    private _userService:UserService
    private _groceryService:GroceryService
    constructor(orderRepo:OrderRepository,userService:UserService,groceryService:GroceryService){
        this._orderRepository =orderRepo
        this._userService = userService
        this._groceryService = groceryService
    }

    public async createOrder({userId,items,description}:{
        userId:string,
        items:Array<TOrderItem>,
        description:string
    }):Promise<TResponse>{
        try {
            const getUserResult = await this._userService.getUserById(userId)
            if(!getUserResult.success){
                return {success:false,code:601}
            } 
            const newOrderId = generateOrderId()
            let updateObjs:Array<{id:string,quantity:number,updateType:GROCERY_QUANTITY_UPDATE_TYPE}> =[]
            items.forEach((item)=>{
                updateObjs.push({
                    id:item.itemId,
                    quantity:item.quantity,
                    updateType:GROCERY_QUANTITY_UPDATE_TYPE.DECREMENT
                })
            }) 
            const itemQuantityReduceResult = await this._groceryService.updateGroceryQuantity(updateObjs)
            if(!itemQuantityReduceResult.success){
                if(itemQuantityReduceResult.code ==601){
                    return {
                        success:false,
                        code:602
                    }
                }else if(itemQuantityReduceResult.code == 602){
                    return {
                        success:false,
                        code:603
                    }
                }else{
                    return {
                        success:false
                    }
                }
            }
            const newOrder:TOrder = {
                id:newOrderId,
                userId:userId,
                items:typeof items == 'string'?JSON.parse(items):items,
                createdAt:Date.now(),
                description:description
            }
            const result = await this._orderRepository.addOrder({...newOrder})
            if(result.success){
                return {success:true}
            }else{
                return {success:false}
            }
        } catch (error) {
            console.log(error)
            return {success:false}
        }
    }

    public async getOrdersByUserId(userId:string):Promise<TResponse>{
        try {
            const getUserResult = await this._userService.getUserById(userId)
            if(!getUserResult.success){
                return {success:false,code:601}
            } 
            const result = <Array<any>>await this._orderRepository.getOrdersByUserId(userId)
            let orders:Array<TOrder>=[]
            result.forEach((res)=>{
                orders.push({
                    id:res.id,
                    userId:res.user_id,
                    items:res.items,
                    createdAt:res.createdAt,
                    description:res.description
                })
            })
            return {
                success:true,
                data:result
            }
        } catch (error) {
            console.log(error)
            return {success:false}
        }
    }
}

export default OrderService