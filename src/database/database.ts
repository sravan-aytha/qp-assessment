import mysql2 from 'mysql2/promise'

class Database{
    private _dbConnection!:mysql2.Connection
    private _dbHost:string;
    private _dbPort:number;
    private _dbPassword:string;
    private _dbName:string
    private _dbUser:string
    constructor(){
         this._dbHost=process.env.DB_HOST || 'localhost'
         this._dbPort=Number(process.env.DB_PORT) || 3306
         this._dbName=process.env.DB_NAME || "qpassessment"
         this._dbPassword=process.env.DB_PASSWORD || "test123"
         this._dbUser = process.env.DB_USER || 'root'
    }

    public async getInstance(){
        if(!this._dbConnection){
            this._dbConnection = await mysql2.createConnection({
                host:this._dbHost,
                port:this._dbPort,
                user:this._dbUser,
                password:this._dbPassword,
                database:this._dbName
            })
        }
        return this._dbConnection
    }
}

export default Database