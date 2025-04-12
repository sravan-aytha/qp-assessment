import { GROCERY_CATEGORY, TGrocery } from "../models/grocery-model";
import GroceryRepository from "../repositories/grocery-repository";
import { GroceryUtils } from "../utilities/grocery-utility";

class GroceryService{
    private _groceryRepository:GroceryRepository

    constructor(groceryRepo:GroceryRepository){
        this._groceryRepository = groceryRepo
    }

    public async addGroceryItem({name,description,price,quantity,category}:{
        name:string,
        description:string,
        price:number,
        quantity:number,
        category:GROCERY_CATEGORY
    }){
        const isGroceryItemExists = (await this.getGroceryItemByName(name)).length
        if(isGroceryItemExists){
            return {
                success:false,
                code:601
            }
        }
        const newGroceryId = GroceryUtils.generateNewGroceryId()
        let groceryItem:TGrocery = {
            id: newGroceryId,
            name: name,
            quantity: quantity,
            description: description,
            price: price,
            category: category
        }
        const result = await this._groceryRepository.addGroceryItem({...groceryItem})
        if(result.success){
            return {
                success:true,
                code:200
            }
        }else{
            return {success:false,code:500}
        }
    }

    public async getGroceryItemByName(name:string):Promise<Array<TGrocery>>{
        const result = <Array<any>> await this._groceryRepository.getGroceryItemByName(name)
        let groceriesList:Array<TGrocery>=[]
        if(result){
            for(let i=0;i<result.length;i++){
                groceriesList.push({
                    id: result[i].id,
                    name: result[i].name,
                    quantity: result[i].quantity,
                    description: result[i].descripiton,
                    price: result[i].price,
                    category: result[i].category
                })
            }
            return groceriesList
        }
        return []
    }
    
    public async deleteGroceryItem(){

    }
}

export default GroceryService