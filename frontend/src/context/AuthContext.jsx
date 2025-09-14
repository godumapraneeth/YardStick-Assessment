import { createContext,useContext,useState } from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(JSON.parse(localStorage.getItem("user")) || null);

    const login=(userData,token)=>{
        localStorage.setItem("user",JSON.stringify(userData));
        localStorage.setItem("token",token);
        setUser(userData);
    };

    const logout=()=>{
        localStorage.clear();
        setUser(null);
    };

    const updateUser=(newUserData)=>{
        setUser(newUserData);
        localStorage.setItem("user",JSON.stringify(newUserData));
    }

    return(
        <AuthContext.Provider value={{user,login,logout,updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=() => useContext(AuthContext);