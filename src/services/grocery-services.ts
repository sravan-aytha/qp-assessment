import { TResponse } from "src/models/general-model";
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

    public async getGroceriesByIds(ids:Array<string>):Promise<TResponse>{
        try {
            const result = <Array<any>>await this._groceryRepository.getGroceriesByIds(ids)
            let groceries:Array<TGrocery>=[]
            result.forEach((gro)=>{
                groceries.push({
                    id: gro.id,
                    name: gro.name,
                    quantity: gro.quantity,
                    description: gro.description,
                    price: gro.price,
                    category: gro.category
                })
            })
            return {success:true,data:groceries}
        } catch (error) {
            console.log(error)
            return {
                success:false
            }
        }
    }

    public async updateGroceryQuantity(updateObjs:Array<{id:string,updateType:GROCERY_QUANTITY_UPDATE_TYPE,quantity:number}>):Promise<TResponse>{

        let groceryIds:Array<string> = []

        updateObjs.forEach((up)=>{
            groceryIds.push(up.id)
        })

        const getAllGroceryObjInUpdatesResp = await this.getGroceriesByIds(groceryIds)
        if(!getAllGroceryObjInUpdatesResp.success){
            return {success:false}
        }
        const allGroceryObjInUpdates=<Array<TGrocery>>getAllGroceryObjInUpdatesResp.data
        if(allGroceryObjInUpdates.length !== groceryIds.length){
            return{
                success:false,
                code:601
            }
        }
        let groceryMap = new Map<string,TGrocery>()
        allGroceryObjInUpdates.forEach((gro)=>{
            groceryMap.set(gro.id,gro)
        })
        console.log("-----",updateObjs)
        let finalUpdate:Array<{id:string,quantity:number}>=[]
        for(let i=0;i<updateObjs.length;i++){
            let currUpdate = updateObjs[i]
            if(currUpdate.updateType==GROCERY_QUANTITY_UPDATE_TYPE.DECREMENT){
                let curGrocery = groceryMap.get(currUpdate.id)
                if(curGrocery){
                    if((curGrocery.quantity-currUpdate.quantity)<0){
                        return {
                            success:false,
                            code:602
                        }
                    }
                    curGrocery.quantity-=currUpdate.quantity
                    finalUpdate.push({
                        id:curGrocery.id,
                        quantity:curGrocery.quantity
                    })
                }
            }else if(currUpdate.updateType == GROCERY_QUANTITY_UPDATE_TYPE.INCREMENT){
                let curGrocery = groceryMap.get(currUpdate.id)
                if(curGrocery){
                    curGrocery.quantity+=currUpdate.quantity
                    finalUpdate.push({
                        id:curGrocery.id,
                        quantity:curGrocery.quantity
                    })
                }
            }
        }
        console.log("final updates",finalUpdate)
       
        const result = await this._groceryRepository.updateGroceryQuantity(finalUpdate)
        if(result){

            return {success:true}
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