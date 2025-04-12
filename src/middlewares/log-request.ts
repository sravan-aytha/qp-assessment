export const logRequest = async(req:any,res:any,next:any)=>{
    console.log(`got request for ${req.url} at ${new Date(Date.now()).toLocaleString()} by test user`) // test user is actual user
    next()
}