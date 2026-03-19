import express from 'express'
import 'dotenv/config'

import logger from './middleware/logger.js';
import connectDB from './model/db.js';
import Authenticate from './middleware/auth.js';
import userRouter from './router/userRouter.js';
import contentRouter from './router/contentRouter.js';
import shareRouter from './router/shareRouter.js';

export const app = express()
app.use(express.json())
app.use(logger)

app.get('/' ,(req,res) => {
    res.send("Hello buddy... on " + process.env.port );
})

app.use('/api/v1/', userRouter)

app.use(Authenticate)

// @ts-ignore
app.get('/test', (req,res) => res.send(JSON.stringify({userId: req.user}))) 

app.use('/api/v1/content', contentRouter)

app.use("/api/v1/brain", shareRouter)

connectDB().then(() => {
    app.listen(process.env.port, () => console.log("server on port", process.env.port));
}).catch((e) =>{
    console.log("App Backend Connection Failed")
})