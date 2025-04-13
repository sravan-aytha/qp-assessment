import { GROCERY_CATEGORY, GROCERY_QUANTITY_UPDATE_TYPE, TGrocery } from "../models/grocery-model";
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

    public async getAllGroceryitems():Promise<Array<TGrocery>>{
        try{
            const result = <Array<any>>await this._groceryRepository.getAllGroceryItems()
            const groceryList:Array<TGrocery>=[]
            result.forEach((item)=>{
                groceryList.push({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    description: item.description,
                    price: item.price,
                    category: item.category
                })
            })
            return groceryList
        }catch(e){
            console.log(e)
            return []
        }
    }

    public async updateGroceryQuantity(id:string,quantityUpdateType:GROCERY_QUANTITY_UPDATE_TYPE,quantity:number){
        const currentGrocery = (<Array<any>>await this._groceryRepository.getGroceryItemById(id))[0]
        if(!currentGrocery){
            return {
                success:false,
                code:601 // no grocery item with that
            }
        }
        let currentquantity = currentGrocery.quantity
        if(quantityUpdateType==GROCERY_QUANTITY_UPDATE_TYPE.DECREMENT && (currentquantity-quantity) < 0){
            return {
                success:false,
                code:602 // more quntity reduce than available hypothetical
            }
        }
        if(quantityUpdateType == GROCERY_QUANTITY_UPDATE_TYPE.INCREMENT){
            currentquantity+=quantity
        }else if (quantityUpdateType == GROCERY_QUANTITY_UPDATE_TYPE.DECREMENT){
            currentquantity-=quantity
        }
        const result = await this._groceryRepository.updateGroceryQuantity(id,currentquantity)
        if(result){
            return {
                success:true
            }
        }

        return {success:false}
    }
    public async updateGroceryDetails({id,name,description,price,category}:{
        id:string,
        name?:string,
        description?:string,
        price?:number,
        category?:number
    }){
        try {
            const currentGrocery = (<Array<any>>await this._groceryRepository.getGroceryItemById(id))[0]
            if(!currentGrocery){
                return {
                    success:false,
                    code:601 // no grocery item with that
                }
            }
            const result = await this._groceryRepository.updateGroceryDetails({
                id:id,
                name:name,
                description:description,
                price:price,
                category:category
            })
            if(result){
                return {
                    success:true
                }
            }
            return{success:false}
            
        } catch (error) {
            console.log(error)
            return {success:false}
        }
    }

    public async deleteGroceryItem(id:string){
        try {
            const currentGrocery = (<Array<any>>await this._groceryRepository.getGroceryItemById(id))[0]
            if(!currentGrocery){
                return {
                    success:false,
                    code:601 // no grocery item with that
                }
            }
            const deleteResult =await this._groceryRepository.deleteGroceryItem(id)
            if(deleteResult){
                return {success:true}
            }
            return {success:false}
            
        } catch (error) {
         console.log(error)
         return {success:false}   
        }
    }
}

export default GroceryService