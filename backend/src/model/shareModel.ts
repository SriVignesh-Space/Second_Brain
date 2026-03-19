import mongoose, { model, Schema } from 'mongoose';
import * as z from 'zod'

export const shareObject = z.object({
    contentId : z.string(),
    userId : z.string(),
    code : z.string()
})
export type shareType = z.infer<typeof shareObject>;

export type shareDBtype = Omit<shareType, "userId" | "contentId"> & {
    userId : mongoose.Types.ObjectId,
    contentId : mongoose.Types.ObjectId
}

// mongoose schema
const shareShema = new Schema<shareDBtype>({
    contentId : {
        type :  mongoose.Types.ObjectId,
        required : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    code : {
        type : String,
        required : true,
    }
})

export const shareModel = model("share", shareShema);