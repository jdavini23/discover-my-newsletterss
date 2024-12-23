import React from 'react';
import { useAuthStore } from '../stores/authStore';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Welcome, {user?.name || 'User'}!</h2>
        <p className="mb-4">Email: {user?.email}</p>

        <div className="flex space-x-4">
          <button
            onClick={() => {
              /* Navigate to profile */
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Edit Profile
          </button>
          <button
            onClick={logout}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
