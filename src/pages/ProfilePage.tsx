import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useUserProfileStore from '../stores/userProfileStore';
import { useAuthStore } from '../stores/authStore';

// Profile Page Sections
import ProfileInfoSection from '../components/profile/ProfileInfoSection';
import PreferencesSection from '../components/profile/PreferencesSection';
import AccountSettingsSection from '../components/profile/AccountSettingsSection';
import InteractionInsightsSection from '../components/profile/InteractionInsightsSection';

// Heroicons
import {
  PencilIcon,
  UserIcon,
  CogIcon,
  ChartBarIcon,
  StarIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// Define profile sections as a const to remove redundancy
const PROFILE_SECTIONS = [
  {
    name: 'info',
    label: 'Profile Info',
    icon: UserIcon,
    component: ProfileInfoSection,
  },
  {
    name: 'preferences',
    label: 'Preferences',
    icon: StarIcon,
    component: PreferencesSection,
  },
  {
    name: 'settings',
    label: 'Account Settings',
    icon: CogIcon,
    component: AccountSettingsSection,
  },
  {
    name: 'insights',
    label: 'Interaction Insights',
    icon: ChartBarIcon,
    component: InteractionInsightsSection,
  },
];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { profile, fetchProfile, isLoading, error } = useUserProfileStore();
  const [activeSection, setActiveSection] = useState<
    'info' | 'preferences' | 'settings' | 'insights'
  >('info');

  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.uid) {
      fetchProfile(user.uid);
    }
  }, [user, fetchProfile, navigate]);

  const renderLoadingState = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-dark-background">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 bg-white dark:bg-dark-surface rounded-2xl shadow-lg"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-4 border-primary-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Loading Profile</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Fetching your personalized experience
            </p>
          </motion.div>
        </div>
      );
    }
    return null;
  }, [isLoading]);

  if (renderLoadingState) return renderLoadingState;

  if (error) {
    return <div>Error loading profile: {error}</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-dark-background">
      {/* Mobile Header with Edit Profile Button */}
      <div className="lg:hidden flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img
            src={profile.profileImage || '/images/default-avatar.svg'}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-primary-200"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {profile.displayName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsCustomizationModalOpen(true)}
            className="
              p-2 
              bg-primary-100 
              text-primary-700 
              rounded-lg 
              hover:bg-primary-200 
              transition
              dark:bg-primary-900 
              dark:text-primary-200
            "
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button onClick={toggleMobileSidebar} className="text-gray-600 dark:text-gray-300">
            {isMobileSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-1/4 pr-8 hidden lg:block">
          <nav className="space-y-2">
            {PROFILE_SECTIONS.map(section => (
              <button
                key={section.name}
                className={`w-full text-left p-2 flex items-center ${
                  activeSection === section.name ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveSection(section.name as any)}
              >
                <section.icon className="h-5 w-5 mr-2" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-3/4">
          {activeSection === 'info' && <ProfileInfoSection profile={profile} />}
          {activeSection === 'preferences' && <PreferencesSection profile={profile} />}
          {activeSection === 'settings' && <AccountSettingsSection profile={profile} />}
          {activeSection === 'insights' && <InteractionInsightsSection profile={profile} />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
