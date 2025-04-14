import * as rs from 'randomstring'
import md5 from 'md5'
export const generateNewUserId = ()=>{
    return 'u-'+rs.generate(6)
}
export const getHashedUserPassword = async(pwd:string)=>{
    return await md5(pwd)
}