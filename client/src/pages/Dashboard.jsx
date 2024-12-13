import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGavel, FaUserCircle, FaBriefcase } from "react-icons/fa"; // Importing icons
import AssignedGigsCard from "../components/AssignedGigsCard";
import AllGigsByUser from "../components/AllGigsByUser";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
        <p className="text-white text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg rounded-3xl p-6 mx-4 mt-12">
        <div className="container mx-auto text-center">
          {/* Circle with Symbol */}
          <div className="bg-white rounded-full w-28 h-28 mx-auto flex items-center justify-center shadow-lg">
            {/* New Symbol: Gear */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-16 h-16 text-green-600"
              fill="currentColor"
            >
              {/* Gear symbol */}
              <path d="M32 8c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm0 42c-9.9 0-18-8.1-18-18s8.1-18 18-18 18 8.1 18 18-8.1 18-18 18zm-6-14h-4v-4h4v4zm12 0h-4v-4h4v4zm-6-6h-4v-4h4v4z" />
            </svg>
          </div>
          {/* Header Text */}
          <h1 className="text-3xl font-extrabold mt-4">Dashboard</h1>
          <p className="mt-2 text-base text-gray-100">
            Welcome back, {user.name}!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Profile Section */}
          <div className="p-6 bg-gray-100 rounded-t-xl">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your Profile
            </h2>
            <p className="text-gray-600 mt-2">
              Manage your account and see your information below.
            </p>
          </div>

          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Name</h3>
                <p className="text-lg text-gray-800">{user.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Email</h3>
                <p className="text-lg text-gray-800">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Role</h3>
                <p className="text-lg text-gray-800 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {user?.role === "ecohero" ? (
              <Link
                to="/gigs"
                className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaGavel className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-600">
                  Explore Gigs
                </h3>
                <p className="text-md text-gray-600 mt-2">
                  Find nearby gigs and start bidding to make an impact.
                </p>
              </Link>
            ) : (
              <AllGigsByUser />
            )}

            {user?.role === "ecohero" && <AssignedGigsCard />}

            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
              <FaBriefcase className="text-4xl text-blue-600 mx-auto mb-4" />{" "}
              {/* Added icon */}
              <h3 className="text-xl font-semibold text-blue-600">
                Explore Cities
              </h3>
              <p className="text-md text-gray-600 mt-2">
                Discover cities and their sustainable initiatives.
              </p>
              <a
                href="https://cleanitapp.netlify.app/pages/city/bangalore" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-semibold hover:underline mt-4 inline-block"
              >
                Go to Cities
              </a>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
              <FaUserCircle className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-600">
                Update Profile
              </h3>
              <p className="text-md text-gray-600 mt-2">
                Modify your account information and settings.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
