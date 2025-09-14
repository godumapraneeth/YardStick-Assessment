import Tenant from "../../../models/Tenant.js";
import { withDB } from "../../../lib/withDB.js";
import { requireAuth } from "../../../lib/auth.js";
import { enableCors } from "../../../lib/cors.js";
import { withCors } from "../../../lib/withCors.js";

async function handler(req,res){
    const {method}=req;
    const {slug}=req.query;

    if(method!=="POST"){
        res.setHeader("Allow",["POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    try{
        if(req.user.role!=="admin"){
            return res.status(403).json({error:"Forbidden:Only admins can upgrade"});
        }

        const tenant=await Tenant.findOne({slug});
        console.log(tenant);
        if(!tenant){
            return res.status(404).json({error:"Tenant not found"});
        }
        
        if (String(req.user.tenantId) !== String(tenant._id)) {
  return res.status(403).json({ error: "Forbidden - admin does not belong to this tenant" });
}
        if(tenant.plan==="pro"){
            return res.status(400).json({error:"Tenant is already on Pro plan"});
        }

        tenant.plan="pro";
        await tenant.save();

        return res.status(200).json({
            message:"Tenant upgraded to Pro successfully",
            tenant
        });
    }catch(err){
        console.error("Upgrade error",err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export default withCors(withDB(requireAuth(handler,["admin"])));
