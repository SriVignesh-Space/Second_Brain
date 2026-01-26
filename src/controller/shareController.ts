import { type Request, type Response } from "express";
import { shareModel, type shareType } from '../model/shareModel.js';
import getContentByID from "../util/getContentById.js";
import mergeSharedCode from "../util/mergeSharedCode.js";
import getCode from "../util/random.js";
import { ContentModel } from "../model/ContentModel.js";

export const getSharedContents = async(req : Request,res : Response) => {
    try{
        // @ts-ignore
        const userId = req.user?.id;
        const sharedContent = await shareModel.find({userId});
        const contentIds = sharedContent.map((obj) => String(obj.contentId))
        const contents = await getContentByID(contentIds)

        const response = mergeSharedCode(contents, sharedContent)
        res.status(200).send(response);
    }
    catch(e : any){
        console.log(e.message)
        res.send(500).send({message : "Sharing failed"});
    }
}

export const shareContent = async (req : Request,res:Response) => {
    const content = req.body
    try{
        const contentId = content.contentId;
        const code = String(getCode());
        // @ts-ignore
        const userId = req.user?.id;

        console.log({contentId, userId, code})

        const existing = await shareModel.findOne({contentId})
        if(existing) {
            res.status(400).send({message : "already in sharing"});
            return;
        }

        await ContentModel.findByIdAndUpdate(contentId, {share : true})

        await shareModel.create({contentId, userId ,code})

        res.status(200).send({contentId, userId, code})
    }
    catch(e : any){
        console.log(e.message);
        res.status(500).send({message : "Sharing error"});
    }
}

export const getContent = async (req : Request,res : Response) => {
    try{
        const { sharelink } = req.params;
        
        const sharedContent = await shareModel.find({code : String(sharelink)})
        const contentIds = sharedContent.map((obj) => String(obj.contentId))
        const content = await getContentByID(contentIds)
        res.status(200).send(content);
    }
    catch(e : any){
        console.log(e.message)
        res.status(500).send({message: "Sharing Code Failed"})
    }
}

export const stopShareContent = async (req : Request, res : Response) => {
    try{
        const content =  req.body;
        const contentId = content.contentId;

        await ContentModel.findByIdAndUpdate(contentId, {share : false})
        
        await shareModel.findOneAndDelete({contentId : String(contentId)})

        res.status(200).send({success : true, contentId});
    }
    catch(e : any) {
        console.log(e.message)
        res.status(500).send({message: "Sharing Code Failed"})
    }
}