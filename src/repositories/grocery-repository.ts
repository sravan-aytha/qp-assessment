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


    public async getAllGroceryItems():Promise<any>{
        try{
            const query = `SELECT * from groceries`
            const result = await this._baseRepository.execute(query)
            // console.log(result)
            return result
        }catch(e){
            throw e
        }
    }

    public async getGroceryItemById(id:string){
        try{
            const query = `SELECT * from groceries WHERE id = ?`
            const values=[id]
            const result = await this._baseRepository.execute(query,values)
            console.log(result)
            return result
        }catch(e){
            throw e
        }
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

    public async getGroceriesByIds(ids:Array<string>){
        try{
            const placeholders = ids.map(() => '?').join(', ');
            const query = `SELECT * from groceries WHERE id IN (${placeholders})`
            const values =ids
            const result = await this._baseRepository.execute(query,values)
            return result
        }catch(e){
            throw e
        }
    }
    public async updateGroceryQuantity(updateInfos:Array<{id:string,quantity:number}>):Promise<any>{
        try{
            const ids = updateInfos.map(row=>row.id)
            const caseStatements = updateInfos.map(() => 'WHEN ? THEN ?').join(' ');
            const query = `
                        UPDATE groceries
                        SET quantity = CASE id
                            ${caseStatements}
                        END
                        WHERE id IN (${ids.map(() => '?').join(', ')})
                        `;

            const values = updateInfos.flatMap(({ id, quantity }) => [id, quantity]).concat(ids);

            
            const result = await this._baseRepository.execute(query,values)
            return true
        }catch(e){
            throw e
        }
    }

    public async updateGroceryDetails({id,name,description,price,category}:{
        id:string,
        name?:string,
        description?:string,
        price?:number,
        category?:number
    }){
        try{

            const query =['UPDATE groceries']
            const fields=[]
            const values=[]
            query.push("SET")
            if(name){
                fields.push("name=?")
                values.push(name)
            }
            if(description){
                fields.push("description=?")
                values.push(description)
            }
            if(price || (price && price==0)){
                fields.push("price=?")
                values.push(price)
            }
            if(category || (category && category==0)){
                fields.push("category =?")
                values.push(category)
            }
            query.push(fields.join(','))
            query.push("WHERE id=?")
            values.push(id)
            
            const finalQuery = query.join(" ")
            console.log(finalQuery)
            const result = await this._baseRepository.execute(finalQuery,values)
            return true
        }catch(e){
            throw e
        }
    }
    
    public async deleteGroceryItem(id:string){
        try {
            const query = `DELETE FROM groceries WHERE id=?`
            const values =[id]
            const result = await this._baseRepository.execute(query,values)
            return true
        } catch (error) {
            throw error
        }
    }
}

export default GroceryRepository