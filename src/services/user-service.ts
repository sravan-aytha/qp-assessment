import UserRepository from "repositories/user-repositoy";
import { TResponse } from "src/models/general-model";
import { TUser, USER_ROLES } from "src/models/user-model";
import { generateNewUserId, getHashedUserPassword } from "src/utilities/user-utility";

class UserService{
    private _userRepository:UserRepository

    constructor(userRepo:UserRepository){
        this._userRepository = userRepo
    }

    public async addUser({name,phone,password,role}:{
        name:string,
        phone:string,
        password:string,
        role:USER_ROLES
    }):Promise<TResponse>{
        try{
            let userWithPhoneResult = await this.getUserByPhone(phone)
            if(!userWithPhoneResult.success){
                return {success:false}
            }
            let userwithGivenPhoneExists = (<Array<TUser>> userWithPhoneResult.data).length?true:false
            if(userwithGivenPhoneExists){
                return {
                    success:false,
                    code:601
                }
            }
            console.log("no user..")
            const newUserId = generateNewUserId()
            const newUser:TUser={
                id: newUserId,
                name: name,
                phone: phone,
                password: await getHashedUserPassword(password),
                role:role
            }
            const result = await this._userRepository.createUser({...newUser})
            if(result.success){
                return {
                    success:true
                }
            }
            return {success:false}
        }catch(err){
            console.log(err)
            return {success:false}
        }
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

    public async getUserByPhone(phone:string):Promise<TResponse>{
        try{
            const result = <Array<any>>await this._userRepository.getUserByPhone(phone)
            const users:Array<TUser>=[]
            result.forEach((usr)=>{
                users.push({
                    id: usr.id,
                    name: usr.name,
                    phone:usr.phone,
                    password:usr.password,
                    role:usr.role
                })
            })
            return {
                success:true,
                data:users
            }
        }catch(err){
            console.log(err)
            return {
                success:false
            }
        }
    }

    public async updateUserName(id:string,name:string):Promise<TResponse>{
        try {
            const isUserThere = await this._userRepository.getUserById(id)
            if(!isUserThere){
                return {success:false,code:601}
            }
            const result = await this._userRepository.updateUserName(id,name)

            if(result){
                return {success:true}
            }
            return {success:false}
        } catch (error) {
            console.log(error)
            return {success:false}
        }
    }

    public async changeUserPassword(id:string,newPassword:string):Promise<TResponse>{
        try{
            const isUserThere = await this._userRepository.getUserById(id)
            if(!isUserThere){
                return {success:false,code:601}
            }
            const newhashedPassword = await getHashedUserPassword(newPassword)
            const result = await this._userRepository.updateuserPassword(id,newhashedPassword)
            if(result){
                return {success:true}
            }
            return {success:false}
        }catch(err){
            console.log(err)
            return {success:false}
        }
    }
    public async deleteUser(id:string):Promise<TResponse>{
        try{
            const isUserThere = await this._userRepository.getUserById(id)
            if(!isUserThere){
                return {success:false,code:601}
            }
            const result = await this._userRepository.deleteUser(id)

            if(result){
                return {success:true}
            }
            return {success:false}
        }catch(error){
            console.log(error)
            return {success:false}
        }
    }

}

export default UserService