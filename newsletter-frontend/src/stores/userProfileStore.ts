import { create } from 'zustand';
import { User } from '@/types/firestore';
import { 
  fetchUserProfile, 
  updateUserProfile,
  updateNewsletterPreferences,
  fetchAvailableTopics
} from '@/services/firestore';

interface UserProfileState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
  availableTopics: string[];

  // Actions
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (updates: Partial<Omit<User, 'id' | 'createdAt'>>) => Promise<void>;
  updateNewsletterPrefs: (preferences: User['newsletterPreferences']) => Promise<void>;
  loadAvailableTopics: () => Promise<void>;
}

export const useUserProfileStore = create<UserProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,
  availableTopics: [],

  fetchProfile: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await fetchUserProfile(userId);
      set({ profile, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch profile', 
        isLoading: false 
      });
      throw error;
    }
  },

  updateProfile: async (updates) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      if (!currentProfile) {
        throw new Error('No user profile found');
      }

      await updateUserProfile(currentProfile.id, updates);
      
      // Optimistically update local state
      set({ 
        profile: { 
          ...currentProfile, 
          ...updates 
        }, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update profile', 
        isLoading: false 
      });
      throw error;
    }
  },

  updateNewsletterPrefs: async (preferences) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      if (!currentProfile) {
        throw new Error('No user profile found');
      }

      await updateNewsletterPreferences(currentProfile.id, preferences);
      
      // Optimistically update local state
      set({ 
        profile: { 
          ...currentProfile, 
          newsletterPreferences: preferences 
        }, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update newsletter preferences', 
        isLoading: false 
      });
      throw error;
    }
  },

  loadAvailableTopics: async () => {
    set({ isLoading: true, error: null });
    try {
      const topics = await fetchAvailableTopics();
      set({ 
        availableTopics: topics.map(topic => topic.id), 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load topics', 
        isLoading: false 
      });
      throw error;
    }
  }
}));
