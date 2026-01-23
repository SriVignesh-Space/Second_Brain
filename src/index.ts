import express from 'express'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import logger from './middleware/logger.js';
import connectDB from './model/db.js';
import userObject,{userModel, type userType } from './model/userModel.js';
import Authenticate from './middleware/auth.js';
import { ContentModel, ContentObject } from './model/ContentModel.js';

const app = express()
app.use(express.json())
app.use(logger)

app.get('/' ,(req,res) => {
    res.send("Hello buddy... on " + process.env.port );
})

app.post('/api/v1/signup', async (req,res) => {
    const user : userType = req.body;
    try{
        await userObject.parse(user);
        
        const existing = await userModel.findOne({email : user.email});

        if(existing !== null) throw new Error("Username Already Existed");
        console.log(existing);

        const hashedPassword : string = await bcrypt.hash(user.password, 5);
        user.password = hashedPassword;

        userModel.create(user);
        res.status(201).send({message : "User Creation success." , user})
    }
    catch(e : any){
        res.status(400).send({message : "Registration failed", error : e.message});
    }

})

app.post('/api/v1/signin', async (req,res) => {
    try{
        const user  = req.body;
        let existing = await userModel.findOne({username : user.username});

        if(existing === null) throw new Error("User Not Found");

        const loggin = await bcrypt.compare(user.password, String(existing.password))

        if(loggin){
            const token = jwt.sign({username : user.username, id : String(existing._id)}, String(process.env.JWT_SECRET), {
                expiresIn : '2h'
            });
            res.cookie("token", token)
            res.status(200).send({token : token, id : existing._id})
        }
        res.status(400).send({error : "Logging failed "});
    }
    catch(e : any) {
        res.status(400).send({error : e.message});
    }
})

app.use(Authenticate)

app.get('/test', (req,res) => res.send("fire")) 

app.get('/api/v1/content', async (req, res) => {

    // @ts-ignore
    const uid  = req.user?.id;
    
    const content = await ContentModel.find({userId : uid})
    res.status(200).send(content);
})

app.post('/api/v1/content', async (req,res) => {
    try{
        const content = req.body;
        await ContentObject.parse(content);

        ContentModel.create(content);
        res.status(200).send({success : true, content});
    }
    catch (e : any) { 
        console.log(e.message);
        res.status(400).send({error : "Content Validation Failed"});
    }
})

app.delete('/api/v1/content/:id', async (req,res) => {
    const {id} = req.params;
   try{
        await ContentModel.findByIdAndDelete(id);
        // @ts-ignore
        return res.status(200).send({id , message : "Deleted Successfully"});
   }
   catch(e : any) {
    console.log(e.message);
    res.status(400).send({error : e});
   }
})

app.post("/api/v1/brain/share", (req,res) => {
    
})

app.get('/api/v1/brain/:sharelink',(req,res) => {

})



connectDB().then(() => {
    app.listen(process.env.port, () => console.log("server on port", process.env.port));
}).catch((e) =>{
    console.log("App Backend Connection Failed")
})