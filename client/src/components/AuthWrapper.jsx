import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { isTokenValid } from '../utils/verifyToken';

const AuthWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isRegisterRoute = location.pathname === '/register';

    if (isRegisterRoute) {
      setLoading(false); // Allow access to the register page
      return;
    }

    if (token && isTokenValid(token)) {
      setLoading(false); // Token is valid, do nothing
    } else {
      localStorage.removeItem('token'); // Clear expired/invalid token
      navigate('/login'); // Redirect to login
    }
  }, [location, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return <Outlet/>; // Render child components if authenticated
};

export default AuthWrapper;
