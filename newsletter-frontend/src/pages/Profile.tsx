import React from 'react';
import { useAuthStore } from '../stores/authStore';

const Profile: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <p className="text-gray-900">{user?.name || 'Not set'}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <p className="text-gray-900">{user?.email}</p>
        </div>
        {/* Add more profile fields as needed */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
