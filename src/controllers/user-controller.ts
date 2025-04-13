import UserService from "services/user-service";

class UserController{
    private _userService!: UserService;

    construcutor(userServ:UserService){
        this._userService= userServ
    }

    createUser = async(request:any,response:any)=>{
        this._userService.deleteUser("")
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
        
    }
    
}

export default UserController