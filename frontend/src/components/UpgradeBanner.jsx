import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext";

export default function UpgradeBanner({tenant}){
    const {user,updateUser}=useAuth();

    const upgrade=async () =>{
        try{
            const res=await api.post(`/tenants/${tenant}/upgrade`);
            alert("Tenant upgraded to Pro!");
            const updatedUser={
              ...user,
              tenant:{
                ...user.tenant,
                plan:res.data.tenant.plan,
              },
            };

            updateUser(updatedUser);
        }catch(err){
            console.error(err);
            alert("Upgrade failed.");
        }
    };

    if(!user || user.role !== "admin") return null;

    return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded flex justify-between items-center">
      <span>Free plan reached for {user.tenant.slug}. Upgrade to Pro for unlimited notes.</span>
      <button
        onClick={upgrade}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Upgrade
      </button>
    </div>
  );
}