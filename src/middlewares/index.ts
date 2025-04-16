import { logRequest } from "./log-request"
import express from 'express'
export const middleware = (app:any)=>{
    app.use(logRequest)
    app.use(express.json())
}