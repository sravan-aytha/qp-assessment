import express from 'express'
import dotenv from 'dotenv';
import { startup } from './startup';
import { middleware } from './middlewares';

// import conn from '../test/test.js';
dotenv.config();

(async()=>{
    const app = express()
    const port = process.env.SERVER_URL || 8080
    
    middleware(app)

    const {groceryRouter,userRouter} = await startup()
    
    app.use('/grocery',groceryRouter)
    app.use('/user',userRouter)
    
    app.listen(port,async ()=>{
        console.log(`server listening at port ${port}`)
    })
    
})();





