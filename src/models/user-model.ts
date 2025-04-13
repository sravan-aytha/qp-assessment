export type TUser={
    id:string,
    name:string,
    phone:string,
    password:string,
    role:USER_ROLES,
}

export enum USER_ROLES{
    USER=0,
    ADMIN
}