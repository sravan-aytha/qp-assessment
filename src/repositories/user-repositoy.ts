import BaseRepository from "./base-repository";

class UserRepository{
    private _baseRepository!: BaseRepository;
    
    constructor(baseRepo:BaseRepository){
        (async()=>{
            this._baseRepository = baseRepo
            const query =`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(20) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role INT NOT NULL 
            )
            `
            const result = await this.createUserTable(query)
             /*@ts-ignore*/
             if(result?.warningStatus == 0){
                console.log(` Users table not found ..... \n Users table created`)
            }
            /*@ts-ignore*/
            else if(result?.warningStatus == 1){
                console.log(` Users table found.... \n skipping table creation`)
            }
        })();
    }

    private async createUserTable(query:string){
        try{

            const result = await this._baseRepository.execute(query)
            return result

        }catch(e){
            throw e
        }
    }

    public async createUser({id,name,password,phone,role}:{
        id:string,
        name:string,
        password:string,
        phone:string,
        role:number
    }){
        try {
            const query =`INSERT INTO users (id,name,password,phone,role) values (?,?,?,?,?)`
            const values =[id,name,password,phone,role]
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
        } catch (error) {
            throw error
        }
    }

    public async getAllUsers(){
        try {
            const query = `SELECT * FROM users`
            const result = await this._baseRepository.execute(query)
            return result
        } catch (error) {
            throw error
        }
    }

    public async getUserById(id:string){
        try {
            const query = `SELECT * FROM users WHERE id = ?`
            const values =[id]
            const result = await this._baseRepository.execute(query,values)
            return result
        } catch (error) {
            throw error
        }
    
    }
    public async getUserByPhone(phone:string){
        try {
            const query = `SELECT * FROM users WHERE phone = ?`
            const values =[phone]
            const result = await this._baseRepository.execute(query,values)
            return result
        } catch (error) {
            throw error
        }
    }

    public async getUserByPhoneandPassword(phone:string,password:string){
        try {
            const query =`SELECT * from users WHERE phone=? AND password=? LIMIT 1`
            const values = [phone,password]
            const result = await this._baseRepository.execute(query,values)
            return result
        } catch (error) {
            throw error
        }
    }

    public async updateUserName(id:string,name:string){
        try {
            const query = `UPDATE users SET name = ? WHERE id = ?`
            const values = [name,id]
            const result = await this._baseRepository.execute(query,values)
            return true
        } catch (error) {
            throw error
        }
    }

    public async updateuserPassword(id:string,newPassword:string){
        try {
            const query = `UPDATE users SET password = ? WHERE id = ?`
            const values = [newPassword,id]
            const result = await this._baseRepository.execute(query,values)
            return true
        } catch (error) {
            throw error
        }
    }

    public async deleteUser(id:string){
        try {
            const query = `DELETE FROM users WHERE id =?`
            const values = [id]
            const result = await this._baseRepository.execute(query,values)
            return true
        } catch (error) {
            throw error
        }
    }

}

export default UserRepository