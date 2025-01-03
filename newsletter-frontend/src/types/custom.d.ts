// Custom type declarations to resolve build issues

import { User as FirebaseUser } from 'firebase/auth';

// Extend existing types
declare module 'firebase/auth' {
  interface User extends FirebaseUser {
    displayName?: string | null;
    photoURL?: string | null;
  }
}

// Define missing types
interface Newsletter {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  category?: string;
  categories?: string[];
  author?: string;
  tags?: string[];
  subscribers?: number;
  subscribersCount?: number;
}

interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  profileImage?: string;
}

interface EventData {
  message: string;
  provider?: string;
  method?: string;
  email?: string;
}

interface SubscriptionData {
  newsletterId: string;
  userId: string;
}

enum DeliveryPreference {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

interface NewsletterStats {
  totalSubscribers: number;
  engagementRate: number;
}

interface NewsletterEngagement {
  newsletterId: string;
  openRate: number;
  clickRate: number;
}

// Extend Plausible Tracker
declare module 'plausible-tracker' {
  interface TrackEvent {
    (eventName: string, options?: Record<string, unknown>): void;
  }
}
