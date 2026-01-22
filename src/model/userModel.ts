import * as z from "zod"
import mongoose, { Schema } from "mongoose";


// zod validation and types
const userObject =  z.object({
        username: z.string(),
        password: z.string("min 3 character required").min(3).regex(/^[A-Z]/),
        email : z.email(),
    })

export default userObject;

export type userType = z.infer<typeof userObject>


// mongoose user 
const userSchema = new Schema<userType>({
    username : String,
    email : String,
    password : String
})

export const userModel = mongoose.model('User', userSchema);