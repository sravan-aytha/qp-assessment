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
                    message:"grocery item already exists, please check again"
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

    deleteGroceryItem = async(request:any,response:any)=>{

    }

}

export default GroceryController