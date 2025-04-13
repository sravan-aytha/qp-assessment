import UserRepository from "repositories/user-repositoy";
import { TResponse } from "src/models/general-model";
import { TUser, USER_ROLES } from "src/models/user-model";

class UserService{
    private _userRepository:UserRepository

    constructor(userRepo:UserRepository){
        this._userRepository = userRepo
    }

    public async addUser({name,phone,password,category}:{
        name:string,
        phone:string,
        password:string,
        category:USER_ROLES
    }){

    }
    public async getUserById(id:string):Promise<TResponse>{
        try {
            const result = (<Array<any>>(await this._userRepository.getUserById(id)))[0]
            if(result){

                const user:TUser={
                    id:result.id,
                    name:result.name,
                    phone:result.phone,
                    role:result.role,
                    password:result.password
                }
                return {
                    success:true,
                    data:user
                }
            }
            return {
                success:false,
                code:601,
            }

        } catch (error) {
            console.log(error)
            return {
                success:false
            }
        }
    }

    public async getAllUsers():Promise<TResponse>{
        try {
            const result = <Array<any>>await this._userRepository.getAllUsers()
            let userList:Array<TUser>=[]
            result.forEach((user)=>{
                userList.push({
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    password: user.password,
                    role: user.role
                })
            })
            return {
                success:true,
                data:userList
            }
        } catch (error) {
            console.log(error)
            return {
                success:false
            }
        }
    }

    public async getUserByPhone(phone:string){

    }

    public async updateUserName(id:string,name:string){

    }
    public async deleteUser(id:string){

    }

}

export default UserService