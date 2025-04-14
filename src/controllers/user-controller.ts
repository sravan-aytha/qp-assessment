import UserService from "services/user-service";

class UserController{
    private _UserService: UserService;

    constructor(userServ:UserService){
        this._UserService=userServ
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
        
    }
    changeUserPassword = async(request:any,response:any)=>{
        
    }
    updateUserName = async(request:any,response:any)=>{
        
    }
    deleteUser = async(request:any,response:any)=>{
        
    }
    getUserById = async(request:any,response:any)=>{
        
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