import mongoose from "mongoose";

const tenantSchema=new mongoose.Schema({
    name:String,
    slug:{type:String,unique:true},
    plan:{type:String,enum:["free","pro"],default:"free"}
});

export default mongoose.models.Tenant || mongoose.model("Tenant",tenantSchema);