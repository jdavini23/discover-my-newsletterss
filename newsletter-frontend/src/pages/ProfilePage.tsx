import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserProfileStore from '../stores/userProfileStore';
import useAuthStore from '../stores/authStore';

// Profile Page Sections
import ProfileInfoSection from '../components/profile/ProfileInfoSection';
import PreferencesSection from '../components/profile/PreferencesSection';
import AccountSettingsSection from '../components/profile/AccountSettingsSection';
import InteractionInsightsSection from '../components/profile/InteractionInsightsSection';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { profile, fetchProfile, isLoading, error } = useUserProfileStore();
  const [activeSection, setActiveSection] = useState<
    'info' | 'preferences' | 'settings' | 'insights'
  >('info');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.uid) {
      fetchProfile(user.uid);
    }
  }, [user, fetchProfile, navigate]);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error loading profile: {error}</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex">
      {/* Sidebar Navigation */}
      <div className="w-1/4 pr-8">
        <nav className="space-y-2">
          <button
            className={`w-full text-left p-2 ${activeSection === 'info' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveSection('info')}
          >
            Profile Info
          </button>
          <button
            className={`w-full text-left p-2 ${activeSection === 'preferences' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveSection('preferences')}
          >
            Preferences
          </button>
          <button
            className={`w-full text-left p-2 ${activeSection === 'settings' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveSection('settings')}
          >
            Account Settings
          </button>
          <button
            className={`w-full text-left p-2 ${activeSection === 'insights' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveSection('insights')}
          >
            Interaction Insights
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4">
        {activeSection === 'info' && <ProfileInfoSection profile={profile} />}
        {activeSection === 'preferences' && <PreferencesSection profile={profile} />}
        {activeSection === 'settings' && <AccountSettingsSection profile={profile} />}
        {activeSection === 'insights' && <InteractionInsightsSection profile={profile} />}
      </div>
    </div>
  );
};

export default ProfilePage;
