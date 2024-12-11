import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AssignedGigsCard from "../components/AssignedGigsCard";
import AllGigsByUser from "../components/AllGigsByUser";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from local storage
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-gray-200">Welcome back, {user.name}!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Profile Section */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Profile
            </h2>
            <p className="text-gray-600 mt-1">
              View and manage your account details.
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <h3 className="text-sm font-medium text-gray-600">Name</h3>
                <p className="text-lg text-gray-800">{user.name}</p>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-sm font-medium text-gray-600">Email</h3>
                <p className="text-lg text-gray-800">{user.email}</p>
              </div>

              {/* Role */}
              <div>
                <h3 className="text-sm font-medium text-gray-600">Role</h3>
                <p className="text-lg text-gray-800 capitalize">{user.role}</p>
              </div>

              {/* Location */}
              {/* <div>
                <h3 className="text-sm font-medium text-gray-600">Location</h3>
                <p className="text-lg text-gray-800">
                  {user.location.lat}, {user.location.lon}
                </p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Additional Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {user?.role === "ecohero" ? (
              <Link
                to={"/gigs"}
                className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-100 transition duration-200"
              >
                <h3 className="text-lg font-medium text-blue-600">View Gigs</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Explore nearby gigs to bid on.
                </p>
              </Link>
            ) : (
              <AllGigsByUser />
            )}

            {user?.role === "ecohero" && <AssignedGigsCard />}
            {/* <div className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-100 transition duration-200">
              <h3 className="text-lg font-medium text-blue-600">
                Update Profile
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Change your account information.
              </p>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
