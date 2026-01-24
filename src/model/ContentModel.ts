import mongoose, { model, Schema, Types } from "mongoose";
import * as z from 'zod'

export const ContentObject = z.object(
    {
    userId : z.string("User Id not valid"),
    title : z.string(),
    link : z.url("Url format should be followed"),
    type : z.enum(["Youtube" ,"Instagram" , "X" , "Notes" , "Document" , "Other"],"Must be in the specified type"),
    share : z.boolean(),
    description : z.string().optional()
}
)

type ContentType = z.infer<typeof ContentObject>;

// mongoose Schema
export type contentDBType = Omit<ContentType, "userId"> & {
    userId : Types.ObjectId
}

const ContentSchema = new Schema<contentDBType>({
    userId : { type : mongoose.Types.ObjectId, ref : "user" ,required : true  },
    title : {type : String, required : true },
    link : {type : String, required : true },
    type : {
        type : String,
        required: true,
        enum : ["Youtube" ,"Instagram" , "X" , "Notes" , "Document" , "Other"]
    },
    share : {
        type : Boolean,
        required : true,
    },
    description : {type : String, required:false} 
}, {
    timestamps : true
})

export const ContentModel = model("content", ContentSchema);    