import mongoose from "mongoose";

export default async function connectDB() {
    const MONGO_URL:string = process.env.MONGO_URL || "";
    try{
        mongoose.connect(MONGO_URL);
        console.log("DB Connected")
    }
    catch(e){
        console.log("DB connection failed",e);
    }
}