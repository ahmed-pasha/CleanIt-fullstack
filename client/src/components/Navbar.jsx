import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  // const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const { user } = useAuth(); 
  
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    setToken(localStorage.getItem("token"));
    // setUser(userdata?.name);
    setRole(userdata?.role);
    console.log(user);
  }, [localStorage]);
  

  // If the current path is "/login", return an empty fragment
  if (location.pathname === "/login") {
    return <></>;
  }

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        {/* Branding */}
        <div className="text-white text-xl font-bold">EcoMate</div>

        {/* Navigation Links */}
        <div className="space-x-4 flex">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/gigs" className="text-white">
            Gigs
          </Link>
          {/* <Link to="/groups" className="text-white">
            Groups
          </Link> */}
          <Link to="/payments" className="text-white">
            Payments
          </Link>

          {token ? (
            <Link
              to={"/login"}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="text-white"
            >
              Logout
            </Link>
          ) : (
            <Link to="/login" className="text-white">
              Login
            </Link>
          )}

          {/* Role Display */}
          {user && (
            <Link
              to="/dashboard"
              className="text-white flex-col gap-1 justify-center items-center"
            >
              <div className="text-lg font-semibold capitalize">{user.name}</div>
              <div className="font-normal capitalize">( {user.role} )</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
