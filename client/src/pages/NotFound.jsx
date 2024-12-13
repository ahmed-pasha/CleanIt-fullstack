import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="text-center text-white">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-2xl mb-6">Oops! Page Not Found</p>
        <p className="text-lg mb-6">The page you are looking for might have been removed or temporarily unavailable.</p>
        <a
          href="/"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
