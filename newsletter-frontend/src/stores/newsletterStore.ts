import { create } from 'zustand';
import {
  fetchNewsletters,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  fetchUserSubscriptions,
} from '@/services/firestore';
import {
  generatePersonalizedRecommendations,
  recordNewsletterInteraction,
} from '@/services/recommendationService';
import { Newsletter, NewsletterFilter } from '@/types/firestore';
import { UserProfile, User } from '../types/profile';
import { useUserProfileStore } from './userProfileStore';

interface NewsletterState {
  newsletters: Newsletter[];
  userSubscriptions: (Newsletter & { subscriptionId: string })[];
  recommendedNewsletters: Newsletter[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;

  // Actions
  discoverNewsletters: (filters?: NewsletterFilter) => Promise<void>;
  getRecommendedNewsletters: () => Promise<void>;
  subscribeNewsletter: (newsletterId: string) => Promise<void>;
  unsubscribeNewsletter: (newsletterId: string) => Promise<void>;
  fetchSubscriptions: () => Promise<void>;
  recordInteraction: (
    newsletterId: string,
    interactionType: 'view' | 'subscribe' | 'unsubscribe' | 'read',
    duration?: number
  ) => Promise<void>;
}

// Helper function to map UserProfile to User
const mapProfileToUser = (profile: UserProfile): User => ({
  id: profile.uid,
  email: profile.email,
  displayName: profile.displayName,
  createdAt: profile.accountCreatedAt,
  newsletterPreferences: {
    interestedTopics: profile.interests,
    frequencyPreference: profile.newsletterPreferences.frequency,
    receiveRecommendations: true, // Default or derive from profile
  },
  recommendationProfile: {
    viewedNewsletters: profile.activityLog
      .filter(log => log.type === 'newsletter_view')
      .map(log => log.newsletterId),
    subscribedNewsletters: profile.activityLog
      .filter(log => log.type === 'newsletter_subscribe')
      .map(log => log.newsletterId),
    interactionScores: {}, // You might want to implement a more sophisticated scoring mechanism
  },
  interestedTopics: profile.interests,
  frequencyPreference: profile.newsletterPreferences.frequency,
  receiveRecommendations: true,
  interests: profile.interests,
  readingHistory: profile.activityLog
    .filter(log => log.type === 'newsletter_view')
    .map(log => log.newsletterId),
});

const useNewsletterStore = create<NewsletterState>((set, get) => ({
  newsletters: [],
  userSubscriptions: [],
  recommendedNewsletters: [],
  isLoading: false,
  error: null,
  hasMore: true,

  discoverNewsletters: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const newsletters = await fetchNewsletters(filters);

      set({
        newsletters,
        isLoading: false,
        hasMore: newsletters.length === (filters.pageSize || 12),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch newsletters',
        isLoading: false,
      });
      throw error;
    }
  },

  getRecommendedNewsletters: async () => {
    set({ isLoading: true, error: null });
    try {
      // Get user profile from store
      const { profile } = useUserProfileStore.getState();

      if (!profile) {
        // If no profile, return an empty list of recommended newsletters
        set({
          recommendedNewsletters: [],
          isLoading: false,
        });
        return;
      }

      const user = mapProfileToUser(profile);
      const recommendedNewsletters = await generatePersonalizedRecommendations(user, {
        sortBy: 'recommended',
      });

      set({
        recommendedNewsletters,
        isLoading: false,
      });
    } catch (error) {
      set({
        recommendedNewsletters: [], // Ensure recommended newsletters is reset
        error: error instanceof Error ? error.message : 'Failed to fetch recommendations',
        isLoading: false,
      });
      throw error;
    }
  },

  subscribeNewsletter: async (newsletterId: string) => {
    set({ isLoading: true, error: null });
    try {
      await subscribeToNewsletter(newsletterId);

      // Record interaction for recommendation
      await get().recordInteraction(newsletterId, 'subscribe');

      // Optimistically update state
      const currentNewsletters = get().newsletters;
      const updatedNewsletters = currentNewsletters.map(newsletter =>
        newsletter.id === newsletterId
          ? { ...newsletter, subscriberCount: (newsletter.subscriberCount || 0) + 1 }
          : newsletter
      );

      set({
        newsletters: updatedNewsletters,
        isLoading: false,
      });

      // Refresh subscriptions
      await get().fetchSubscriptions();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to subscribe',
        isLoading: false,
      });
      throw error;
    }
  },

  unsubscribeNewsletter: async (newsletterId: string) => {
    set({ isLoading: true, error: null });
    try {
      await unsubscribeFromNewsletter(newsletterId);

      // Record interaction for recommendation
      await get().recordInteraction(newsletterId, 'unsubscribe');

      // Optimistically update state
      const currentNewsletters = get().newsletters;
      const updatedNewsletters = currentNewsletters.map(newsletter =>
        newsletter.id === newsletterId
          ? { ...newsletter, subscriberCount: Math.max((newsletter.subscriberCount || 0) - 1, 0) }
          : newsletter
      );

      set({
        newsletters: updatedNewsletters,
        isLoading: false,
      });

      // Refresh subscriptions
      await get().fetchSubscriptions();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to unsubscribe',
        isLoading: false,
      });
      throw error;
    }
  },

  fetchSubscriptions: async () => {
    set({ isLoading: true, error: null });
    try {
      const subscriptions = await fetchUserSubscriptions();

      set({
        userSubscriptions: subscriptions,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch subscriptions',
        isLoading: false,
      });
      throw error;
    }
  },

  recordInteraction: async (
    newsletterId: string,
    interactionType: 'view' | 'subscribe' | 'unsubscribe' | 'read',
    duration?: number
  ) => {
    try {
      await recordNewsletterInteraction(newsletterId, interactionType, duration);
    } catch (error) {
      console.error('Failed to record interaction', error);
    }
  },
}));

export { useNewsletterStore };
