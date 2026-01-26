import express, { type Request, type Response } from 'express'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userObject,{userModel, type userType } from '../model/userModel.js';

export const signup = async (req : Request,res : Response) => {
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
}

export const signin = async (req : Request,res : Response) => {
    try{
        const user  = req.body;
        let existing = await userModel.findOne({email : user.email});

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
}