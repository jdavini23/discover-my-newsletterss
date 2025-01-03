// Custom type declarations to resolve build issues

import { User as FirebaseUser } from 'firebase/auth';
import { DocumentData, Query } from 'firebase/firestore';
import { EventOptions } from 'plausible-tracker';

// Extend existing types
declare module 'firebase/auth' {
  interface User extends FirebaseUser {
    displayName?: string | null;
    photoURL?: string | null;
  }

  // Add FirebaseError type
  export interface FirebaseError extends Error {
    code: string;
    message: string;
    name: string;
  }
}

// Define missing types
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
}

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  profileImage: string;
  newsletterPreferences?: {
    categories?: string[];
    frequency?: string;
    topics?: string[];
  };
  activityLog?: Array<{
    action: string;
    timestamp: Date;
    details?: Record<string, any>;
  }>;
}

export interface EventData {
  message: string;
  provider?: string;
  method?: string;
  email?: string;
  timestamp?: string;
  category?: string;
  source?: string;
  severity?: string;
  query?: string;
  stack?: string;
  context?: ErrorContext;
}

export interface SubscriptionData {
  newsletterId: string;
  userId: string;
  createdAt: Date;
  deliveryPreference: DeliveryPreference;
  status: 'active' | 'paused' | 'cancelled';
}

export enum DeliveryPreference {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

export interface NewsletterStats {
  totalSubscribers: number;
  engagementRate: number;
  averageReadTime?: number;
}

export interface NewsletterEngagement {
  newsletterId: string;
  openRate: number;
  clickRate: number;
  totalReads?: number;
}

export interface SubscriptionOption {
  id: string;
  name: string;
  price?: number;
  features: string[];
  deliveryPreference: DeliveryPreference;
}

// Extend Plausible Tracker
declare module 'plausible-tracker' {
  export interface TrackEvent {
    (eventName: string, options?: Record<string, unknown>): void;
  }

  export interface ErrorContext {
    message?: string;
    stack?: string;
    source?: string;
    category?: string;
  }

  export interface EventOptions {
    props?: Record<string, unknown>;
  }
}

// Extend Firestore Query
declare module 'firebase/firestore' {
  interface Query<T = DocumentData, U = DocumentData> {
    (): Query<T, U>;
  }
}

// Global type augmentations
declare global {
  interface Window {
    trackEvent?: (eventName: string, options?: Record<string, unknown>) => void;
  }
}
