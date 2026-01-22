import mongoose, { model, Model, Schema, Types } from "mongoose";
import * as z from 'zod'

export const ContentObject = z.object(
    {
    userId : z.string(),
    title : z.string(),
    link : z.url(),
    type : z.enum(["youtube" ,"Instagram" , "X" , "Notes" , "Document" , "Other"]),
    time : z.date(),
    description : z.string().optional()
}
)

type ContentType = z.infer<typeof ContentObject>;

// mongoose Schema
type contentDBType = Omit<ContentType, "userId"> & {
    userId : Types.ObjectId
}

const ContentSchema = new Schema<contentDBType>({
    userId : { type : mongoose.Types.ObjectId, ref : "user" ,required : true  },
    title : {type : String, required : true },
    link : {type : String, required : true },
    type : {
        type : String,
        required: true,
        enum : ["youtube" ,"Instagram" , "X" , "Notes" , "Document" , "Other"]
    },
    time : {type : Date, required : true},
    description : {type : String, required:false} 
}, {
    timestamps : true
})

export const ContentModel = model("content", ContentSchema);