import mysql2 from 'mysql2/promise'
class BaseRepository{
    private _database:mysql2.Connection

    constructor(databseConnection:mysql2.Connection){
        this._database = databseConnection
    }

    public async execute(query:string,values:Array<any>=[]){
        try{
            const [rows] = await this._database.execute(query,values)
            return rows
        }catch(error){
            console.log("error while executing query in database")
            throw error
        }
    }
}

export default BaseRepository