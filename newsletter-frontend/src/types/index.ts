// Comprehensive Type Definitions

export interface Newsletter {
  id: string;
  name: string;
  title?: string;
  description: string;
  logoUrl: string;
  category: string;
  categories: string[];
  author: string;
  tags: string[];
  subscribers: number;
  subscribersCount: number;
  rating?: number;
  imageUrl?: string;
  coverImage?: string;
  topics?: string[];
  frequency?: 'daily' | 'weekly' | 'monthly';
  createdAt?: Date;
  subscriberCount?: number;
  user?: string;
  operationType?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName?: string;
  email?: string;
  profileImage?: string;
  interests?: string[];
  preferences?: UserPreference;
  newsletterPreferences?: {
    promotions: boolean;
    recommendations: boolean;
  };
  activityLog?: Array<{
    action: string;
    timestamp: Date;
    details?: Record<string, unknown>;
  }>;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  interests?: string[];
  newsletterPreferences?: {
    promotions: boolean;
    recommendations: boolean;
  };
}

export interface UserPreference {
  id?: string;
  categories?: string[];
  topics?: string[];
  currentInterests?: string[];
  readingFrequency?: 'daily' | 'weekly' | 'monthly';
  newsletterPreferences?: {
    promotions: boolean;
    recommendations: boolean;
  };
  excludedNewsletters?: string[];
}

export interface RecommendationContext {
  userId: string;
  preferences: UserPreference[];
  currentInterests?: string[];
}

export interface RecommendationScore {
  newsletterId: string;
  score: number;
  reasons: string[];
}

export interface EnhancedRecommendation {
  newsletterId: string;
  newsletter: Newsletter;
  score: number;
}

export interface EventData {
  type: string;
  timestamp: Date;
  message?: string;
  context?: Record<string, unknown>;
  provider?: string;
  method?: string;
  email?: string;
}

export interface SubscriptionData {
  newsletterId: string;
  userId: string;
  status: 'subscribed' | 'unsubscribed';
  subscribedAt: Date;
}

export interface DeliveryPreference {
  frequency: 'daily' | 'weekly' | 'monthly';
  time?: string;
  timezone?: string;
}

export interface NewsletterStats {
  subscribersCount: string;
  averageRating: number | null;
  totalReviews: number;
  totalSubscribers: number;
  engagementRate: number;
  averageOpenRate?: number;
  averageClickRate?: number;
}

export interface NewsletterEngagement {
  newsletterId: string;
  userId: string;
  openCount: number;
  clickCount: number;
  lastEngaged: Date;
}
