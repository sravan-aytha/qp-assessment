import * as rs from 'randomstring'
export const generateOrderId = ()=>{

    return "O-"+rs.generate(6)
}