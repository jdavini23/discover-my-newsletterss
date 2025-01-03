import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PencilIcon,
  UserIcon,
  CogIcon,
  ChartBarIcon,
  StarIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// Profile Page Sections
import ProfileInfoSection from '../components/profile/ProfileInfoSection';
import PreferencesSection from '../components/profile/PreferencesSection';
import AccountSettingsSection from '../components/profile/AccountSettingsSection';
import InteractionInsightsSection from '../components/profile/InteractionInsightsSection';

// Stores
import useUserProfileStore from '../stores/userProfileStore';
import useAuthStore from '../stores/authStore';

// Modal for Customization
import { ProfileCustomizationModal } from '../components/profile/ProfileCustomizationModal';

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

  const [activeSection, setActiveSection] = useState<string>('info');
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

  // Memoized loading and error states for performance
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

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-red-50 dark:bg-dark-background">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 bg-white dark:bg-dark-surface rounded-2xl shadow-lg"
          >
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2zm1 18h-2v-2h2v2zm0-4h-2V8h2v8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Profile Loading Error</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => fetchProfile(user?.uid || '')}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Retry
            </button>
          </motion.div>
        </div>
      );
    }

    return null;
  }, [isLoading, error, fetchProfile, user]);

  // Early return for loading and error states
  if (renderLoadingState) return renderLoadingState;
  if (!profile) return null;

  // Mobile Sidebar Toggle
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Render the main profile page
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

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 z-50 lg:hidden bg-white dark:bg-dark-surface"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Menu</h2>
                <button onClick={toggleMobileSidebar}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-4">
                {PROFILE_SECTIONS.map(section => (
                  <button
                    key={section.name}
                    className={`
                      w-full 
                      text-left 
                      p-3 
                      rounded-lg 
                      flex 
                      items-center 
                      transition 
                      ${
                        activeSection === section.name
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                    onClick={() => {
                      setActiveSection(section.name);
                      toggleMobileSidebar();
                    }}
                  >
                    <section.icon className="h-6 w-6 mr-3" />
                    {section.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsCustomizationModalOpen(true);
                    toggleMobileSidebar();
                  }}
                  className="
                    w-full 
                    text-left 
                    p-3 
                    rounded-lg 
                    flex 
                    items-center 
                    bg-primary-100 
                    text-primary-700 
                    dark:bg-primary-900 
                    dark:text-primary-200
                  "
                >
                  <PencilIcon className="h-6 w-6 mr-3" />
                  Edit Profile
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-1/4 pr-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-lg"
          >
            {/* Profile Header */}
            <div className="text-center mb-6">
              <img
                src={profile.profileImage || '/images/default-avatar.svg'}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary-200 shadow-md"
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.displayName}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{profile.email}</p>
              <button
                onClick={() => setIsCustomizationModalOpen(true)}
                className="
                  flex 
                  items-center 
                  justify-center 
                  mx-auto 
                  px-4 
                  py-2 
                  bg-primary-100 
                  text-primary-700 
                  rounded-lg 
                  hover:bg-primary-200 
                  transition
                  dark:bg-primary-900 
                  dark:text-primary-200
                "
              >
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {PROFILE_SECTIONS.map(section => (
                <button
                  key={section.name}
                  className={`
                    w-full 
                    text-left 
                    p-3 
                    rounded-lg 
                    flex 
                    items-center 
                    transition 
                    ${
                      activeSection === section.name
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300'
                    }
                  `}
                  onClick={() => setActiveSection(section.name)}
                >
                  <section.icon className="h-6 w-6 mr-3" />
                  {section.label}
                </button>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-3/4 bg-white dark:bg-dark-surface rounded-2xl p-6 lg:p-8 shadow-lg"
        >
          {PROFILE_SECTIONS.map(
            section =>
              activeSection === section.name && (
                <section.component key={section.name} profile={profile} />
              )
          )}
        </motion.div>
      </div>

      {/* Customization Modal */}
      <AnimatePresence>
        {isCustomizationModalOpen && (
          <ProfileCustomizationModal
            isOpen={isCustomizationModalOpen}
            onClose={() => setIsCustomizationModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
