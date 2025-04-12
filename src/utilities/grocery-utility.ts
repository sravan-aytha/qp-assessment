import * as rs from 'randomstring'
export namespace GroceryUtils{
    export const generateNewGroceryId = ()=>{
        return "g-"+rs.generate(5)
    }
}