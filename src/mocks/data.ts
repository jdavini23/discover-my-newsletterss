import { 
  Newsletter, 
  User, 
  Category, 
  Tag, 
  PaginatedNewsletters, 
  ApiError 
} from '../types';

// Comprehensive list of categories
export const categories: Category[] = [
  { id: 'tech', name: 'Technology', icon: '💻' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'health', name: 'Health & Wellness', icon: '🏥' },
  { id: 'arts', name: 'Arts & Culture', icon: '🎨' },
  { id: 'politics', name: 'Politics', icon: '🗳️' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'travel', name: 'Travel', icon: '✈️' },
];

// Comprehensive list of tags
export const tags: Tag[] = [
  { id: 'ai', name: 'Artificial Intelligence' },
  { id: 'startup', name: 'Startup Ecosystem' },
  { id: 'climate', name: 'Climate Change' },
  { id: 'crypto', name: 'Cryptocurrency' },
  { id: 'wellness', name: 'Mental Health' },
  { id: 'innovation', name: 'Tech Innovation' },
  { id: 'sustainability', name: 'Green Technology' },
];

// Expanded mock newsletters with more diverse content and scenarios
export const mockNewsletters: Newsletter[] = [
  {
    id: '1',
    title: 'Tech Horizons',
    description: 'Cutting-edge insights into emerging technologies and digital innovation.',
    author: 'Sarah Chen',
    imageUrl: 'https://example.com/tech-horizons.jpg',
    categories: ['tech', 'science'],
    tags: ['ai', 'innovation'],
    subscriberCount: 45000,
    frequency: 'Weekly',
    isFavorite: false,
    status: 'active',
  },
  {
    id: '2',
    title: 'Green Future',
    description: 'Exploring sustainable technologies and environmental solutions.',
    author: 'Alex Rodriguez',
    imageUrl: 'https://example.com/green-future.jpg',
    categories: ['science', 'tech'],
    tags: ['climate', 'sustainability'],
    subscriberCount: 32000,
    frequency: 'Bi-weekly',
    isFavorite: true,
    status: 'active',
  },
  {
    id: '3',
    title: 'Startup Pulse',
    description: 'In-depth coverage of emerging startups and entrepreneurial ecosystems.',
    author: 'Michael Wong',
    imageUrl: 'https://example.com/startup-pulse.jpg',
    categories: ['tech', 'finance'],
    tags: ['startup', 'innovation'],
    subscriberCount: 28000,
    frequency: 'Monthly',
    isFavorite: false,
    status: 'paused',
  },
  {
    id: '4',
    title: 'Wellness Insider',
    description: 'Comprehensive guide to mental health, nutrition, and holistic well-being.',
    author: 'Emma Thompson',
    imageUrl: 'https://example.com/wellness-insider.jpg',
    categories: ['health'],
    tags: ['wellness'],
    subscriberCount: 55000,
    frequency: 'Weekly',
    isFavorite: true,
    status: 'active',
  },
  {
    id: '5',
    title: 'Crypto Insights',
    description: 'Deep dive into blockchain, cryptocurrencies, and digital finance.',
    author: 'David Kim',
    imageUrl: 'https://example.com/crypto-insights.jpg',
    categories: ['finance', 'tech'],
    tags: ['crypto', 'innovation'],
    subscriberCount: 38000,
    frequency: 'Bi-weekly',
    isFavorite: false,
    status: 'archived',
  }
];

// Paginated newsletters mock
export const paginatedNewsletters: PaginatedNewsletters = {
  data: mockNewsletters,
  total: 50,
  page: 1,
  pageSize: 5,
  totalPages: 10
};

// Enhanced mock user profile
export const mockUser: User = {
  id: 'user123',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  profilePicture: 'https://example.com/profile.jpg',
  interests: ['tech', 'science', 'health'],
  favoriteNewsletters: ['1', '4'],
  subscriptions: ['1', '2', '4'],
  preferences: {
    darkMode: false,
    language: 'en',
    newsletterFrequency: 'weekly',
    emailNotifications: true
  }
};

// Mock API Errors
export const mockApiErrors: Record<string, ApiError> = {
  networkError: {
    code: 'NETWORK_ERROR',
    message: 'Unable to connect to the server. Please check your internet connection.',
    details: 'Connection timeout after 30 seconds'
  },
  unauthorized: {
    code: 'UNAUTHORIZED',
    message: 'You do not have permission to access this resource.',
    details: 'Invalid or expired authentication token'
  },
  notFound: {
    code: 'NOT_FOUND',
    message: 'The requested resource could not be found.',
    details: 'No newsletters match the specified search criteria'
  },
  validationError: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid input provided.',
    details: 'One or more fields do not meet the required validation criteria'
  }
};
