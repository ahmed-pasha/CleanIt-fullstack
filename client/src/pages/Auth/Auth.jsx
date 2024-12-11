import React, { useState, useEffect } from "react";
import { useAuth } from "../../context";

const Auth = () => {
  const { login, register } = useAuth(); // Context functions
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    role: "ecohero", // Default role for registration
    location: { lat: "", lon: "" },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Show a loading state during submission

  // Fetch location only for the registration form
  useEffect(() => {
    if (!isLogin) getCurrentLocation();
  }, [isLogin]);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCredentials((prev) => ({
            ...prev,
            location: { lat: latitude, lon: longitude },
          }));
        },
        () => setError("Could not fetch location. Please enter manually.")
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading state

    try {
      if (isLogin) {
        // Attempt login
        await login({ email: credentials.email, password: credentials.password }, setError);
      } else {
        // Attempt registration
        await register(credentials, setError);
        setIsLogin(true)
      }
    } catch (err) {
      // Update error message based on the error response
      
      setError(
        err.response?.data?.message || // Server-provided error
        (isLogin ? "Invalid email or password." : "Registration failed. Please check your input.")
      );
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={credentials.name}
                  onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!isLogin && (
            <>
              {/* Role Field */}
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  value={credentials.role}
                  onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ecohero">EcoHero</option>
                  <option value="customer">Customer</option>
                </select>
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    id="lat"
                    placeholder="Latitude"
                    value={credentials.location.lat}
                    onChange={(e) =>
                      setCredentials({ ...credentials, location: { ...credentials.location, lat: e.target.value } })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="lon" className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    id="lon"
                    placeholder="Longitude"
                    value={credentials.location.lon}
                    onChange={(e) =>
                      setCredentials({ ...credentials, location: { ...credentials.location, lon: e.target.value } })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-medium py-2 px-4 rounded-lg transition duration-300 ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle Link */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setError(""); // Clear any error
              setIsLogin(!isLogin);
            }}
            className="text-blue-500 hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
