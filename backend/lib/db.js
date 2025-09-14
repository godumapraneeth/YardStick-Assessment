import mongoose from "mongoose";

let isConnected=false;

export async function connectDB(){
    if(isConnected) return;

    try{
        await mongoose.connect(process.env.MONGO_URI);
        isConnected=true;
        console.log("MongoDB Connected");
    }catch(err){
        console.error("MongoDB Connection Error",err);
        throw err;
    }
}