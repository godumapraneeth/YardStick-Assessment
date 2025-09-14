import { useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {login}=useAuth();
    const navigate=useNavigate();

    const handleSubmit=async (e) =>{
        e.preventDefault();
        try{
            const res=await api.post("/auth/login",{email,password});
            login(res.data.user,res.data.token);
            navigate("/notes");
        }catch(err){
            alert("Login failed")
            console.error(err);
        }
    };

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          SaaS Notes Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600">
          Login
        </button>
      </form>
    </div>
  );
}