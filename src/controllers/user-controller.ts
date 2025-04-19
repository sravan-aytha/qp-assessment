import UserService from "services/user-service";
import AuthController from "./authcontroller";
import { TUser } from "src/models/user-model";
import { error } from "console";

class UserController{
    private _UserService: UserService;
    private _authController:AuthController
    constructor(userServ:UserService,authcontroller:AuthController){
        this._UserService=userServ
        this._authController = authcontroller
    }

    createUser = async(request:any,response:any)=>{
        try{
            const {name,phone,password,role} = request.body
            const result = await this._UserService.addUser({
                name:name,
                phone:phone,
                password:password,
                role:role
            })
            if(!result.success){
                if(result.code==601){
                    response.json({
                        success:false,
                        error:"User with the given phone exists,please register with new phone"
                    })
                    return;
                }else{
                    response.json({
                        success:false,
                        error:"unable to create user, please try again"
                    })
                    return ;
                }
            }
            response.json({
                success:true,
                messgae:"User created successfully"
            })
        }catch(e){
            response.json({
                 success:false,
                error:"unable to create user, please try again"
            })
        }
    }

    loginUser = async(request:any,response:any)=>{
        const {phone,password} = request.body
        const userResp = (await this._UserService.getUserByPhoneAndPassword(phone,password))
        if(!userResp.success){
            response.json({
                success:false,
                error:"not user found with the given credentials"
            })
        }
        const user = <TUser>userResp.data
        const authToken = await this._authController.encode({id:user.id,role:user.role})
        response.setHeader("authorization","Bearer "+authToken)
        response.json({success:true,messgae:"logged in successfully"})
    }
    
    changeUserPassword = async(request:any,response:any)=>{
        const {id} = request.user
        const {newPassword} = request.body
        const result = await this._UserService.changeUserPassword(id,newPassword)
        if(result.success){
            response.josn({
                success:true,
                message:"user password changed successfull, please login again"
            })
            return;
        }    
        response.json({
            success:false,
            error:"unable to update user password"
        })
    }
    updateUserName = async(request:any,response:any)=>{
        const {id} = request.user
        const {name} = request.body
        const result = await this._UserService.updateUserName(id,name)
        if(result.success){
            response.json({
                success:true,
                message:"user name updated successfully"
            })
            return;
        }    
        response.json({
            success:false,
            error:"unable to update user name , please try again"
        })
    }
    deleteUser = async(request:any,response:any)=>{
        const {id} = request.user
        const result = await this._UserService.deleteUser(id)
        if(result.success){
            response.json({
                success:true,
                message:"user deleted successfully"
            })
            return;
        }    
        response.json({
            success:false,
            error:"unable to delete user  , please try again"
        })
    }
    getUserById = async(request:any,response:any)=>{
        try{
            const {id} = request.user
            const result = await this._UserService.getUserById(id)
            if(result.success){
                response.json({
                    success:true,
                    user:result.data
                })
                return;
            }
            else{
                response.json({
                    success:false,
                    error:"unable to get the user"
                })
            }

        }catch(e){
            console.log(e)
            response.json({
                success:false,
                message:"unable to get the user"
            })
        }
    }
    getAllUsers = async(request:any,response:any)=>{
        try{
            const result = await this._UserService.getAllUsers()
            if(result.success){
                response.json({
                    success:true,
                    message:"user fetched successfully",
                    data:result.data,
                })
                return;
            }
            response.json({
                success:false,
                error:"unable to fetch the users, please try again"
            })
        }catch(e){
            response.json({
                success:false,
                error:"Unable to fetch the users, please try again "
            })
        }
    }
    
}

export default UserController