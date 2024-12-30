import React, { useState } from 'react';
import { UserProfile } from '../../types/profile';
import useUserProfileStore from '../../stores/userProfileStore';

const DEFAULT_AVATAR = '/src/assets/images/default-avatar.svg';

interface ProfileInfoSectionProps {
  profile: UserProfile;
}

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({ profile }) => {
  const { updateProfile } = useUserProfileStore();
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [bio, setBio] = useState(profile?.bio || '');

  const handleUpdateProfile = async () => {
    if (!profile) return;

    try {
      await updateProfile({
        displayName,
        bio
      });
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  if (!profile) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
      
      <div className="flex items-center mb-6">
        <img 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover mr-6" 
          src={profile.photoURL || DEFAULT_AVATAR} 
        />
        <div>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <button
          onClick={handleUpdateProfile}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoSection;
