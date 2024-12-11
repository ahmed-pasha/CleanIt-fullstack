// Navbar component (Navbar.js)
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa"; // User icon

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    setToken(localStorage.getItem("token"));
    setRole(userdata?.role);
  }, []);

  if (location.pathname === "/login") {
    return <></>;
  }

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-64 min-h-screen bg-blue-600 p-4">
      {/* Branding */}
      <div className="text-white text-xl font-bold mb-8">EcoMate</div>

      {/* Menu Links */}
      <div className="flex flex-col gap-4">
        <Link to="/" className="text-white hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <Link to="/gigs" className="text-white hover:text-yellow-400 transition-colors">
          Gigs
        </Link>
        <Link to="/payments" className="text-white hover:text-yellow-400 transition-colors">
          Payments
        </Link>

        {/* Logout or Login */}
        {token ? (
          <Link
            to="/login"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="text-white hover:text-yellow-400 transition-colors"
          >
            Logout
          </Link>
        ) : (
          <Link to="/login" className="text-white hover:text-yellow-400 transition-colors">
            Login
          </Link>
        )}

        {/* User Profile */}
        {user && (
          <Link to={'/dashboard'} className="text-white mt-6">
            <div className="flex items-center gap-4">
              <FaUserCircle size={40} className="text-white" />
              <div className="flex flex-col text-sm">
                <div className="font-semibold">{user.name}</div>
                <div className="text-gray-300">{user.role}</div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
