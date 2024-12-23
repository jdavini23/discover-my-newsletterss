import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { mockUser } from '../mocks/data';

const ProfileSettingsPage = () => {
  const [user, setUser] = useState({
    name: mockUser.name,
    email: mockUser.email,
    avatarUrl: mockUser.avatarUrl,
    interests: mockUser.interests,
  });

  const [editMode, setEditMode] = useState({
    profile: false,
    interests: false,
  });

  const updateProfile = (field: string, value: string) => {
    setUser(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleInterest = (interest: string) => {
    setUser(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const InterestCategories = [
    'Technology', 'AI', 'Science', 'Startups', 
    'Design', 'Business', 'Finance', 'Health', 
    'Climate', 'Space', 'Crypto', 'Marketing'
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Profile Settings
      </h1>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Personal Information
          </h2>
          <button 
            onClick={() => setEditMode(prev => ({...prev, profile: !prev.profile}))}
            className="text-blue-500 hover:text-blue-600"
          >
            {editMode.profile ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <img 
              src={user.avatarUrl || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover"
            />
            {editMode.profile && (
              <button 
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
                title="Change Avatar"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex-grow">
            {editMode.profile ? (
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={user.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg"
                />
                <input 
                  type="email" 
                  value={user.email}
                  onChange={(e) => updateProfile('email', e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg"
                />
              </div>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {user.email}
                </p>
              </>
            )}
          </div>
        </div>

        {editMode.profile && (
          <div className="text-right">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setEditMode(prev => ({...prev, profile: false}))}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Interests Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Interests
          </h2>
          <button 
            onClick={() => setEditMode(prev => ({...prev, interests: !prev.interests}))}
            className="text-blue-500 hover:text-blue-600"
          >
            {editMode.interests ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          {editMode.interests ? (
            InterestCategories.map((category) => (
              <button
                key={category}
                onClick={() => toggleInterest(category)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  user.interests.includes(category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))
          ) : (
            user.interests.map((interest) => (
              <span 
                key={interest} 
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {interest}
              </span>
            ))
          )}
        </div>

        {editMode.interests && (
          <div className="text-right">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setEditMode(prev => ({...prev, interests: false}))}
            >
              Save Interests
            </button>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-6 border-2 border-red-100 dark:border-red-900">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Danger Zone
        </h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              Permanently delete your account
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone
            </p>
          </div>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof ProfileSettingsPage> = {
  title: 'Pages/Profile Settings',
  component: ProfileSettingsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ProfileSettingsPage>;

export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const EditMode: Story = {
  render: () => {
    const [user, setUser] = useState({
      name: mockUser.name,
      email: mockUser.email,
      avatarUrl: mockUser.avatarUrl,
      interests: mockUser.interests,
    });

    const [editMode, setEditMode] = useState({
      profile: true,
      interests: true,
    });

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Profile Settings
        </h1>

        {/* Profile Section in Edit Mode */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Personal Information
            </h2>
          </div>

          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <img 
                src={user.avatarUrl || 'https://via.placeholder.com/150'} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
              <button 
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
                title="Change Avatar"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>

            <div className="flex-grow space-y-4">
              <input 
                type="text" 
                value={user.name}
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg"
              />
              <input 
                type="email" 
                value={user.email}
                placeholder="Email Address"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
          </div>

          <div className="text-right">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  },
};
