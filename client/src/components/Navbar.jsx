import { Link, useNavigate } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold"><Link to="/">Vote_App</Link></h1>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/create">Create Poll</Link>
            <button onClick={handleLogout} className="bg-red-500 p-1 rounded cursor-pointer">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
