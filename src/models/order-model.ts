export type TOrder = {
    id:string,
    userId:string,
    items:Array<TOrderItem>
    createdAt:number,
    description:string,
}

export type TOrderItem =  {
    itemId:string,
    quantity:number
}