// Navbar component (Navbar.js)
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle, FaHome, FaBriefcase, FaMoneyBill, FaSignOutAlt, FaSignInAlt } from "react-icons/fa"; // Updated icons

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
    <div className="sticky top-0 flex flex-col w-64 min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-4">
      {/* Branding */}
      <div className="text-white text-2xl font-bold mb-8">CleanIT</div>

      {/* Menu Links */}
      <div className="flex flex-col gap-6 text-lg">
        <Link to="/" className="flex items-center text-white hover:text-green-400 transition-colors">
          <FaHome className="mr-4" /> Home
        </Link>
        <Link to="/gigs" className="flex items-center text-white hover:text-green-400 transition-colors">
          <FaBriefcase className="mr-4" /> Gigs
        </Link>
        <Link to="/payments" className="flex items-center text-white hover:text-green-400 transition-colors">
          <FaMoneyBill className="mr-4" /> Payments
        </Link>

        {/* Logout or Login */}
        {token ? (
          <Link
            to="/login"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="flex items-center text-white hover:text-green-400 transition-colors"
          >
            <FaSignOutAlt className="mr-4" /> Logout
          </Link>
        ) : (
          <Link to="/login" className="flex items-center text-white hover:text-green-400 transition-colors">
            <FaSignInAlt className="mr-4" /> Login
          </Link>
        )}

        {/* User Profile */}
        {user && (
          <Link to={'/dashboard'} className="text-white mt-8">
            <div className="flex items-center gap-4">
              <FaUserCircle size={50} className="text-green-400" />
              <div className="flex flex-col text-base">
                <div className="font-semibold text-white">{user.name}</div>
                <div className="text-gray-400 capitalize">{user.role}</div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
