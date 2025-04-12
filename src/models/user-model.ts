export type TUser={
    id:string,
    name:string,
    phone:string,
    password:string,
    role:USER_ROLES,
    address:TUserAddress
}

export type TUserAddress = {
    addressLine:string,
    city:string,
    state:string,
    country:string
}

export enum USER_ROLES{
    ADMIN=0,
    USER
}