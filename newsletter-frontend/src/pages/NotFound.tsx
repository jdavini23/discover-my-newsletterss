import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="mb-6 text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Go to Home
          </Link>
          <Link
            to="/dashboard"
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
