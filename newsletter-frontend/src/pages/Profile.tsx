import React from 'react';
import { useAuthStore } from '../stores/authStore';

const Profile: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Profile</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700">Name</label>
          <p className="text-gray-900">{user?.name || 'Not set'}</p>
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700">Email</label>
          <p className="text-gray-900">{user?.email}</p>
        </div>
        {/* Add more profile fields as needed */}
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
