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
  description?: string;
  logoUrl?: string;
  category?: string;
  categories?: string[];
  author?: string;
  tags?: string[];
  subscribers?: number;
  subscribersCount?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  profileImage?: string;
}

export interface EventData {
  message: string;
  provider?: string;
  method?: string;
  email?: string;
}

export interface SubscriptionData {
  newsletterId: string;
  userId: string;
}

export enum DeliveryPreference {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export interface NewsletterStats {
  totalSubscribers: number;
  engagementRate: number;
}

export interface NewsletterEngagement {
  newsletterId: string;
  openRate: number;
  clickRate: number;
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
