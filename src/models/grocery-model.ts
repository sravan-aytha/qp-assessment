export type TGrocery = {
    id:string
    name:string,
    quantity:number,
    description:string,
    price:number
    category:GROCERY_CATEGORY
}
export enum GROCERY_CATEGORY{
    FRESH_PRODUCE=0,
    MEAT_SEAFOOD,
    DAIRY,
    BAKERY,
    PANTRY_STAPLES,
    BEVERAGES
}

export enum GROCERY_QUANTITY_UPDATE_TYPE{
    INCREMENT=0,
    DECREMENT
}