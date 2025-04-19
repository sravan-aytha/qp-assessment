import OrderService from "services/order-service";

class Ordercontroller{
    private _orderService:OrderService

    constructor(orderServ:OrderService){
        this._orderService = orderServ
    }
    createOrder = async(request:any,response:any)=>{
        try {
            const {items,description} = request.body
            const {id} = request.user
            const userId = id
            const result = await this._orderService.createOrder({userId,items,description})
            if(!result.success){
                if(result.code==601){
                    response.json({
                        success:false,
                        message:"Unable to find the user , please try again"
                    })
                    return;
                }else if (result.code ==602){
                    response.json({
                        success:false,
                        message:"unable to find some grocery items"
                    })
                    return;
                }
                else if (result.code){
                    response.json({
                        success:false,
                        message:"trying to update the grocery quntity by more thann available for some items, please try again"
                    })
                }else{
                    response.json({
                        success:false,
                        message:"unable to create the order"
                    })         
                }
                return;
            }
            response.json({
                success:true,
                message:"order created successfully"
            })
        } catch (error) {
            console.log(error)
            response.json({
                success:false,
                message:"unable to create the order"
            })
        }
    }

    getOrdersbyUser = async(request:any,response:any)=>{
        try {
            const {id} = request.user
            const result = await this._orderService.getOrdersByUserId(id)
            if(!result.success){
                response.json({
                    success:false,
                    message:"unable to get the orders"
                })
                return;
            }
            response.json({
                success:true,
                orders:result.data
            })
        } catch (error) {
            console.log(error)
            response.json({
                success:false,
                message:"unable to get the orders"
            })
        }
    }
}

export default Ordercontroller