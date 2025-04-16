import { GROCERY_QUANTITY_UPDATE_TYPE } from "src/models/grocery-model";
import GroceryService from "../services/grocery-services";

class GroceryController{
    private _GroceryService:GroceryService

    constructor(groceryService:GroceryService){
        this._GroceryService = groceryService
    }

    addGroceryItem = async(request:any,response:any)=>{
        try{

            const {name,description,quantity,price,category} = request.body
            const result = await this._GroceryService.addGroceryItem({
                name:name,
                description:description,
                price:price,
                quantity:quantity,
                category:category
            })
            if(result.success){
                response.json({
                    success:true,
                    message:"grocery item inserted successfully"
                })
                return;
            }
            else if (!result.success && result.code == 601){
                response.json({
                    success:false,
                    error:"grocery item already exists, please check again"
                })
                return;

            }
            response.json({
                success:false,
                error:"grocery item not inserted, please try again"
            }) 
            
        }catch(e){
            console.log(e)
            response.json({
                success:false,
                error:"grocery item not inserted, please try again"
            })
        }
    }

    getGroceryItems = async(request:any,response:any)=>{
        try {
            const result = await this._GroceryService.getAllGroceryitems()
            response.json({
                success:true,
                groceryItems:result
            })
        } catch (error) {
            console.log(error)
            response.json({
                success:false,
                error:"unable to fetch grocery items, please try again"
            })
        }
    }

    updateGroceryItemQuantity = async(request:any,response:any)=>{
        try{
            const updateInfoArr = request.body.updates
            const result = await this._GroceryService.updateGroceryQuantity(updateInfoArr)
            if(!result.success){

                if(!result.success && result.code==601){
                    response.json({
                        success:false,
                        error:"unable to find the some or all of the grocery item, please check again"
                    })
                    return;
                }
                else if(!result.success && result.code == 602){
                    response.json({
                        success:false,
                        error:"invalid opertaion, trying to reduce more than available in any grocery item, please check again"
                    })
                    return;
                }else{
                    response.json({
                        success:false,
                        error:"unable to update the quantity of the egrocery"
                    })
                }
            }
            response.json({
                success:true,
                message:"grocery item updated successfull"
            })
        }catch(e){
            console.log(e)
            response.json({
                success:false,
                error:"unable to update the quantity of the egrocery"
            })
        }
    }

    updateGroceryDetails = async(request:any,response:any)=>{
        try{
            const {id,name,description,price,category} = request.body
            if(!(name || description || price || category)){
                response.json({
                    success:false,
                    error:"unable to update the grocery details, please try updating any single parameter"
                })
                return;
            }
            const result = await this._GroceryService.updateGroceryDetails({
                id:id,
                category:category,
                description:description,
                name:name,
                price:price
            })
            if(!result.success){
                if(result.code == 601){
                    response.json({
                        success:false,
                        error:"unable to find the grocery item, please check again"
                    })
                    return;
                }else{
                    response.json({
                        success:false,
                        error:"unable to update the grocery details, please try again"
                    })
                    return; 
                }
            }
            response.json( {
                success:true,
                message:"grocery details updated successfully"
            })
        }catch(e){
            console.log(e)
            response.json({
                success:false,
                error:"unable to update the grocery details, please try again"
            })
        }
    }
    deleteGroceryItem = async(request:any,response:any)=>{
        try {
            const {id} = request.body
            const result = await this._GroceryService.deleteGroceryItem(id)
            if(!result.success){
                if(result.code == 601){
                    response.json({
                        success:false,
                        error:"unable to find the grocery item, please check again"
                    })
                    return;
                }else{
                    response.json({
                        success:false,
                        error:"unable to delete the grocery details, please try again"
                    })
                    return; 
                } 
            }
            response.json({
                success:true,
                message:"Grocery details deleted successfully"
            })
        } catch (error) {
            console.log(error)
            response.json({
                success:false,
                error:"unable to delete the grocery details, please try again"
            })
        }
    }

}

export default GroceryController