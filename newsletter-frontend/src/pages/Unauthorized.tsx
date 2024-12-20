import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/login" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link 
            to="/" 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
