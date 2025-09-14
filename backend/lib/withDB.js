import { connectDB } from "./db.js";

export function withDB(handler){
    return async (req,res)=>{
        try{
            await connectDB();
            return handler(req,res);
        }catch(err){
            console.error("BD middleware Error",err);
            return res.status(500).json({error:"Internal Server Error"});
        }
    };
}