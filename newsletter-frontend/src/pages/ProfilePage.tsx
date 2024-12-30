import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { useAuthStore } from '@/stores/authStore';
import { useUserProfileStore } from '@/stores/userProfileStore';
import { logOut } from '@/config/firebase';

// Predefined topics
const NEWSLETTER_TOPICS = [
  'Technology', 'Science', 'Business', 'Startups', 
  'Design', 'Programming', 'Entrepreneurship', 
  'AI', 'Crypto', 'Marketing'
];

// Validation schema
const profileSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  
  // Newsletter preferences
  interestedTopics: z.array(z.string()).max(5, 'Select up to 5 topics'),
  frequencyPreference: z.enum(['daily', 'weekly', 'monthly']),
  receiveRecommendations: z.boolean()
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    profile, 
    fetchProfile, 
    updateProfile, 
    updateNewsletterPrefs,
    isLoading, 
    error 
  } = useUserProfileStore();

  const { 
    register, 
    handleSubmit, 
    reset, 
    control,
    formState: { errors, isDirty } 
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: profile?.displayName || '',
      email: profile?.email || '',
      interestedTopics: profile?.newsletterPreferences?.interestedTopics || [],
      frequencyPreference: profile?.newsletterPreferences?.frequencyPreference || 'weekly',
      receiveRecommendations: profile?.newsletterPreferences?.receiveRecommendations ?? true
    }
  });

  // Fetch profile when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchProfile(user.uid);
    }
  }, [user, fetchProfile]);

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile.displayName || '',
        email: profile.email || '',
        interestedTopics: profile.newsletterPreferences?.interestedTopics || [],
        frequencyPreference: profile.newsletterPreferences?.frequencyPreference || 'weekly',
        receiveRecommendations: profile.newsletterPreferences?.receiveRecommendations ?? true
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Update basic profile
      await updateProfile({
        displayName: data.displayName,
      });

      // Update newsletter preferences
      await updateNewsletterPrefs({
        interestedTopics: data.interestedTopics,
        frequencyPreference: data.frequencyPreference,
        receiveRecommendations: data.receiveRecommendations
      });

      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/auth');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  if (!user || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <div className="w-full px-4 py-12">
        <div className="bg-white shadow-md rounded-lg p-8 w-full">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Your Profile
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            {/* Basic Profile Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  {...register('displayName')}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.displayName ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="John Doe"
                />
                {errors.displayName && (
                  <p className="mt-2 text-sm text-red-600">{errors.displayName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-gray-100"
                  placeholder="you@example.com"
                  disabled
                />
              </div>
            </div>

            {/* Newsletter Preferences Section */}
            <div className="bg-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Newsletter Preferences
              </h3>

              {/* Topics Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interested Topics (Select up to 5)
                </label>
                <Controller
                  name="interestedTopics"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {NEWSLETTER_TOPICS.map((topic) => (
                        <label 
                          key={topic} 
                          className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                            field.value.includes(topic) 
                              ? 'bg-primary-100 border border-primary-500' 
                              : 'bg-white border border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={topic}
                            checked={field.value.includes(topic)}
                            onChange={(e) => {
                              const newTopics = e.target.checked
                                ? [...field.value, topic]
                                : field.value.filter((t) => t !== topic);
                              field.onChange(newTopics);
                            }}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm">{topic}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
                {errors.interestedTopics && (
                  <p className="mt-2 text-sm text-red-600">{errors.interestedTopics.message}</p>
                )}
              </div>

              {/* Frequency Preference */}
              <div className="mb-4">
                <label htmlFor="frequencyPreference" className="block text-sm font-medium text-gray-700 mb-2">
                  Newsletter Frequency
                </label>
                <Controller
                  name="frequencyPreference"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  )}
                />
              </div>

              {/* Recommendations Toggle */}
              <div className="flex items-center">
                <Controller
                  name="receiveRecommendations"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                  )}
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Receive newsletter recommendations
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={!isDirty || isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isLoading ? 'Updating...' : 'Update Profile'}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Logout
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 text-center text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
