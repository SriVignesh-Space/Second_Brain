import { type Request,type Response } from "express";
import { ContentModel, ContentObject } from "../model/ContentModel.js";
import { app } from "../index.js";

export const getAllContent = async (req : Request, res : Response) => {

    // @ts-ignore
    const uid  = req.user?.id;
    
    const content = await ContentModel.find({userId : uid})
    res.status(200).send(content);
}

export const postContent = async (req : Request,res : Response) => {
    try{
        const content = req.body;

        // @ts-ignore
        content.userId = req.user?.id;
        await ContentObject.parse(content);

        ContentModel.create(content);
        res.status(200).send({success : true, content});
    }
    catch (e : any) { 
        console.log(e.message);
        res.status(400).send({error : "Content Validation Failed"});
    }
}

export const updateContent = async (req : Request, res : Response) => {
    try{
        const content = req.body;
        const {id} = req.params;
        // @ts-ignore
        content.userId = req.user?.id;
        await ContentObject.parse(content);

        await ContentModel.findByIdAndUpdate(id, content);
        res.status(200).send({success : true, id, content});
    }
    catch(e : any){
        console.log(e.message);
        res.status(500).send({error : "Updation failed"})
    }
}

export const deleteContent = async (req : Request,res : Response) => {
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
}