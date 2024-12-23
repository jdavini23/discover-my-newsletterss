export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Newsletter {
  id: string;
  title: string;
  description: string;
  author: string;
  imageUrl?: string;
  categories: string[];
  tags: string[];
  subscriberCount: number;
  frequency: string;
  isFavorite?: boolean;
  status?: 'active' | 'paused' | 'archived';
}

export interface PaginatedNewsletters {
  data: Newsletter[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  interests: string[];
  favoriteNewsletters: string[];
  subscriptions: string[];
  preferences: {
    darkMode: boolean;
    language: string;
    newsletterFrequency: string;
    emailNotifications: boolean;
  };
}

export interface SearchParams {
  query?: string;
  categories?: string[];
  tags?: string[];
  sortBy?: 'subscribers' | 'recent' | 'relevance';
  page?: number;
  pageSize?: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: string;
}

export interface UserPreferencesUpdate {
  interests?: string[];
  newsletterFrequency?: string;
  emailNotifications?: boolean;
  darkMode?: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
