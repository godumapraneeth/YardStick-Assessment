import Note from "../../models/Note.js";
import Tenant from "../../models/Tenant.js"
import { requireAuth } from "../../lib/auth.js";
import { withDB } from "../../lib/withDB.js";
import { enableCors } from "../../lib/cors.js";
import { withCors } from "../../lib/withCors.js";

async function handler(req,res){

    const {method}=req;

    if(method==="GET"){
        const notes=await Note.find({tenantId:req.user.tenantId});
        return res.status(200).json(notes);
    }

    if(method==="POST"){
        const {title,content} =req.body;

        const tenant=await Tenant.findById(req.user.tenantId);
        if(tenant.plan==="free"){
            const count=await Note.countDocuments({tenantId:tenant._id});
            if(count>=3){
                return res.status(403).json({
                    error:"Free plan limint reached.Upgrade to Pro to add more notes."});
            }
        }

        const note=new Note({
            title,
            content,
            tenantId:req.user.tenantId,
            createdBy:req.user.id,
        });

        await note.save();

        return res.status(201).json(note);
    }

    res.setHeader("Allow",["GET","POST"]);
    return res.status(405).end(`Method ${method} not Allowed`)
}

export default withCors(withDB(requireAuth(handler)));