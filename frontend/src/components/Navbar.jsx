import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function Navbar(){
    const {user,logout}=useAuth();
    
     return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">SaaS Notes</h1>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/"
            className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}