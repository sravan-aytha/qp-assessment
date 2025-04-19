import { TOrderItem } from "src/models/order-model";
import BaseRepository from "./base-repository";

class OrderRepository{
    private _baseRepository!: BaseRepository;

    constructor(baseRepo:BaseRepository){
        (async()=>{

            this._baseRepository = baseRepo
            const query=`CREATE TABLE IF NOT EXISTS orders (
                id VARCHAR(36) PRIMARY KEY,
                user_id VARCHAR(36) NOT NULL,
                items JSON NOT NULL, -- array of objects
                created_at BIGINT NOT NULL,
                description TEXT
                );`
                
                const createTableRes = await this.createOrderTable(query)
                /*@ts-ignore*/
            if(createTableRes?.warningStatus == 0){
                console.log(` orders table not found ..... \n orders table created`)
            }
            /*@ts-ignore*/
            else if(createTableRes?.warningStatus == 1){
                console.log(` orders table found.... \n skipping table creation`)
            }
        })()
    }

    private async createOrderTable(query:string){
        const result = await this._baseRepository.execute(query)
        return result
    }

    public async addOrder({id,userId,items,createdAt,description}:{
        id:string,
        userId:string,
        items:Array<TOrderItem>,
        createdAt:number,
        description:string
    }){
        try{

            const query = `INSERT INTO orders (id,user_id,items,created_at,description) VALUES (?,?,?,?,?)`
            const values = [id,userId,JSON.stringify(items),createdAt,description]
            console.log(query,values)
            const result = await this._baseRepository.execute(query,values)
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

    public async getAllOrders(){
        try{
            const query = `SELECT * FROM orders`

            const result = await this._baseRepository.execute(query)
            console.log(result)
            return result
        }catch(e){
            throw e
        }
    }

    public async getOrderbyId(id:string){
        try {
            const query = `SELECT * FROM orders WHERE id = ?`
            const values = [id]
            const result = await this._baseRepository.execute(query,values)
            return result
        } catch (error) {
            throw error
        }
    }

    public async getOrdersByUserId(userId:string){
        try {
            const query = `SELECT * FROM orders WHERE user_id =?`
            const values =[userId]
            const result = await this._baseRepository.execute(query,values)
            return result
        } catch (error) {
            throw error
        }
    }
        
}

export default OrderRepository