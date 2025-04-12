import BaseRepository from "./base-repository";
import mysql2, { QueryResult } from 'mysql2'
class GroceryRepository{
    private _baseRepository!:BaseRepository

    constructor(baseRepo:BaseRepository){
        (async()=>{
            this._baseRepository = baseRepo
            let result = await this.createGroceryTable(
                `CREATE TABLE IF NOT EXISTS groceries (
                    id VARCHAR(36) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    quantity INT NOT NULL,
                    description TEXT,
                    price FLOAT NOT NULL,
                    category INT NOT NULL
                );`
            )
            /*@ts-ignore*/
            if(result?.warningStatus == 0){
                console.log(` Grocery table not found ..... \n Grocery table created`)
            }
            /*@ts-ignore*/
            else if(result?.warningStatus == 1){
                console.log(` Grocery table found.... \n skipping table creation`)
            }
        })();
    }

    private async createGroceryTable(query:string){
        try{

            const result = await this._baseRepository.execute(query)    
            return result

        }catch(e){
            throw e
        }
    }

    public async addGroceryItem({id,name,quantity,description,price,category}:{
        id:string,
        name:string,
        quantity:number,
        description:string,
        price:number,
        category:number
    }){
        try{

            const query = `INSERT INTO groceries (id,name,quantity,description,price,category) VALUES(?,?,?,?,?,?)`
            const result = await this._baseRepository.execute(query,[id,name,quantity,description,price,category])
            /**@ts-ignore */
            if(result.affectedRows ==1 && result.warningStatus == 0){
                return{
                    success:true
                }
            }else{
                return {
                    success:false
                }
            }    
        }catch(e){
            throw e
        }
    }

    public async deleteGroceryItem(){

    }

    public async getAllGroceryItems(){

    }

    public async getGroceryItemById(){

    }

    public async getGroceryItemByName(name:string):Promise<any>{
        try {
            const query=`SELECT * FROM groceries WHERE name = ? LIMIT 1`
            const values =[name]
            const result = await this._baseRepository.execute(query,values)
            return result
        } catch (e) {
            throw e
            
        }
    }

}

export default GroceryRepository