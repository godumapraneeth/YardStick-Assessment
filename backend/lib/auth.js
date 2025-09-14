import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { connectDB } from "./db.js";

export async function authenticate(req){
    const token=req.headers.authorization?.split(" ")[1];

    if(!token) return null;

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        await connectDB();
        const user=await User.findById(decoded.id).populate("tenantId");
        return user;
    }catch{
        return null;
    }
}

export function signToken(user){
    return jwt.sign(
        {
            id:user._id,
            tenantId:user.tenantId._id,
            role:user.role,
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );
}

export function verifyToken(token){
    try{
        return jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return null;
    }
}

export function requireAuth(handler,roles=[]){
    return async(req,res)=>{
        const authHeader=req.headers.authorization;

        if(!authHeader|| !authHeader.startsWith("Bearer")){
            return res.status(401).json({error:"No token provided"});
        }

        const token=authHeader.split(" ")[1];
        const decoded=verifyToken(token);

        if(!decoded){
            return res.status(401).json({error:"Invalid or expired token"});
        }

        if(roles.length>0 && !roles.includes(decoded.role)){
            return res.status(403).json({error:"Forbidden: insufficient role"});
        }

        req.user=decoded;

        return handler(req,res);
    }
}