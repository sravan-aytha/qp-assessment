import { USER_ROLES } from "src/models/user-model"

export const checkIsAdmin =(req:any,res:any,next:any)=>{
    
    let {userId,role} = req.user
    if(role==USER_ROLES.ADMIN){
        next()
    }
    else{
        res.status(401).json({error:"unauthorised access - need admin access for this"})
    }
}