import React from 'react';
import { useAuthStore } from '../stores/authStore';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || 'User'}!</h2>
        <p className="mb-4">Email: {user?.email}</p>

        <div className="flex space-x-4">
          <button
            onClick={() => {
              /* Navigate to profile */
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
