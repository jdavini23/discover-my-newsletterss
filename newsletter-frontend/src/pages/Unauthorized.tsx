import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-4xl font-bold text-red-600">Unauthorized</h1>
        <p className="mb-6 text-gray-700">You do not have permission to access this page.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/login" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Login
          </Link>
          <Link to="/" className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
