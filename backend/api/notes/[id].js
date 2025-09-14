import { connectDB } from "../../lib/db.js";
import Note from "../../models/Note.js";
import { requireAuth } from "../../lib/auth.js";
import { enableCors } from "../../lib/cors.js";
import { withCors } from "../../lib/withCors.js";
import { withDB } from "../../lib/withDB.js";

async function handler(req,res){


    const {id}=req.query;

    if(req.method==="GET"){
        const note=await Note.findOne({_id:id,tenantId:req.user.tenantId});
        if(!note) return res.status(404).json({error:"note not found"});
        return res.status(200).json(note);
    }

    if(req.method==="PUT"){
        const {title,content}=req.body;
        const note=await Note.findOneAndUpdate(
            {_id:id,tenantId:req.user.tenantId},
            {title,content},
            {new:true}
        );
        if(!note) return res.status(404).json({error:"Note not Found"});
        return res.status(200).json(note);
    }

    if(req.method==="DELETE"){
        const note=await Note.findOneAndDelete({_id:id,tenantId:req.user.tenantId});
        if(!note) return res.status(404).json({error:"note not found"});
        return res.status(200).json({message:"Note deleted"})
    }

    res.setHeader("Allow",["GET","PUT","DELETE"]);
    return res.status(405).end(`Method ${req.method} not Allowed`);
}

export default withCors(withDB(requireAuth(handler)));
