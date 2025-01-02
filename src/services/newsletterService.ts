import { Newsletter } from '@/stores/newsletterStore';

// Expanded mock newsletter data with more diverse and realistic content
const MOCK_NEWSLETTERS: Newsletter[] = [
  {
    id: '1',
    title: 'Tech Horizons',
    description: 'Cutting-edge insights into emerging technologies and digital transformation',
    author: 'Silicon Valley Digest',
    category: 'Technology',
    tags: ['AI', 'Startups', 'Innovation', 'Machine Learning'],
    subscribers: 78500,
    rating: 4.7,
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '2',
    title: 'Climate Innovators',
    description: 'Exploring sustainable solutions and groundbreaking environmental technologies',
    author: 'Green Future Network',
    category: 'Environment',
    tags: ['Sustainability', 'Climate Change', 'Renewable Energy', 'Conservation'],
    subscribers: 52300,
    rating: 4.5,
    imageUrl:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '3',
    title: 'Startup Pulse',
    description:
      'In-depth analysis of startup ecosystems, funding trends, and entrepreneurial strategies',
    author: 'Venture Insights',
    category: 'Business',
    tags: ['Entrepreneurship', 'Venture Capital', 'Startup Ecosystem', 'Innovation'],
    subscribers: 65700,
    rating: 4.6,
    imageUrl:
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '4',
    title: 'Design Decoded',
    description: 'Exploring the intersection of design, creativity, and user experience',
    author: 'Creative Minds Collective',
    category: 'Design',
    tags: ['UX/UI', 'Product Design', 'Creative Thinking', 'Innovation'],
    subscribers: 43200,
    rating: 4.4,
    imageUrl:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '5',
    title: 'Health Horizons',
    description: 'Cutting-edge medical research, wellness trends, and healthcare innovations',
    author: 'Medical Frontiers',
    category: 'Health',
    tags: ['Medical Research', 'Wellness', 'Healthcare Technology', 'Nutrition'],
    subscribers: 59800,
    rating: 4.3,
    imageUrl:
      'https://images.unsplash.com/photo-1532938911079-9e0d9ad53e28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '6',
    title: 'Crypto Insights',
    description: 'Deep dive into blockchain, cryptocurrency trends, and digital finance',
    author: 'Blockchain Weekly',
    category: 'Finance',
    tags: ['Cryptocurrency', 'Blockchain', 'Digital Finance', 'Web3'],
    subscribers: 47600,
    rating: 4.2,
    imageUrl:
      'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '7',
    title: 'AI Ethics Quarterly',
    description:
      'Exploring the ethical implications of artificial intelligence and emerging technologies',
    author: 'Ethical Tech Institute',
    category: 'Technology',
    tags: ['AI Ethics', 'Technology Policy', 'Machine Learning', 'Social Impact'],
    subscribers: 36500,
    rating: 4.8,
    imageUrl:
      'https://images.unsplash.com/photo-1555255707-c07e97f90a0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '8',
    title: 'Space Exploration Digest',
    description: 'Latest discoveries, missions, and breakthroughs in space science and exploration',
    author: 'Cosmic Frontiers',
    category: 'Science',
    tags: ['Space Exploration', 'Astronomy', 'NASA', 'Space Technology'],
    subscribers: 41200,
    rating: 4.6,
    imageUrl:
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '9',
    title: 'Urban Innovation',
    description: 'Smart city technologies, urban design, and sustainable urban development',
    author: 'Future Cities Lab',
    category: 'Urban Planning',
    tags: ['Smart Cities', 'Urban Design', 'Sustainability', 'Infrastructure'],
    subscribers: 33700,
    rating: 4.4,
    imageUrl:
      'https://images.unsplash.com/photo-1519055548599-9e0d9ad53e28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '10',
    title: 'Future of Work',
    description: 'Insights into remote work, digital collaboration, and workplace transformation',
    author: 'Work Evolution',
    category: 'Business',
    tags: ['Remote Work', 'Digital Collaboration', 'Future of Work', 'Productivity'],
    subscribers: 55400,
    rating: 4.5,
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  },
];

// Simulated delay to mimic real API call
const simulateDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock image URLs for newsletters
const NEWSLETTER_IMAGES = [
  'https://via.placeholder.com/300x200?text=Tech+Insights',
  'https://via.placeholder.com/300x200?text=Climate+Weekly',
  'https://via.placeholder.com/300x200?text=Startup+Digest',
  'https://via.placeholder.com/300x200?text=AI+Frontiers',
  'https://via.placeholder.com/300x200?text=Design+Trends',
];

// Generate random subscriber count
const generateSubscriberCount = () => Math.floor(Math.random() * 100000) + 1000;

// Generate random rating
const generateRating = () => Number((Math.random() * 5).toFixed(1));

// Mock newsletter data generator
export const generateMockNewsletters = (count: number = 20): Newsletter[] => {
  const categories = [
    'Technology',
    'Science',
    'Business',
    'Startups',
    'Design',
    'Programming',
    'Entrepreneurship',
    'AI',
    'Crypto',
    'Marketing',
  ];

  const tags = [
    'Innovation',
    'Trends',
    'Insights',
    'Strategy',
    'Future',
    'Growth',
    'Leadership',
    'Research',
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `newsletter_${index + 1}`,
    title: `${categories[index % categories.length]} Insights`,
    description: `Curated ${categories[index % categories.length]} newsletter with the latest trends and insights.`,
    author: `${categories[index % categories.length]} Digest`,
    category: categories[index % categories.length],
    tags: tags.sort(() => 0.5 - Math.random()).slice(0, 3),
    subscribers: generateSubscriberCount(),
    rating: generateRating(),
    imageUrl: NEWSLETTER_IMAGES[index % NEWSLETTER_IMAGES.length],
  }));
};

export interface NewsletterFilters {
  searchQuery?: string;
  categories?: string[];
  tags?: string[];
  minSubscribers?: number;
  maxSubscribers?: number;
  minRating?: number;
  sortBy?: 'popularity' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface NewsletterApiResponse {
  newsletters: Newsletter[];
  total: number;
  page: number;
  pageSize: number;
}

export const NewsletterService = {
  // Fetch newsletters with advanced filtering and pagination
  fetchNewsletters: async (filters: NewsletterFilters = {}): Promise<NewsletterApiResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredNewsletters = [...MOCK_NEWSLETTERS];

    // Search query filter (more comprehensive)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredNewsletters = filteredNewsletters.filter(
        newsletter =>
          newsletter.title.toLowerCase().includes(query) ||
          newsletter.description.toLowerCase().includes(query) ||
          newsletter.author.toLowerCase().includes(query) ||
          newsletter.tags.some(tag => tag.toLowerCase().includes(query)) ||
          newsletter.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      filteredNewsletters = filteredNewsletters.filter(newsletter =>
        filters.categories?.includes(newsletter.category)
      );
    }

    // Tags filter (enhanced to support multiple tag matching)
    if (filters.tags && filters.tags.length > 0) {
      filteredNewsletters = filteredNewsletters.filter(newsletter =>
        filters.tags?.every(tag =>
          newsletter.tags.some(newsletterTag =>
            newsletterTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    // Subscriber range filter
    if (filters.minSubscribers) {
      filteredNewsletters = filteredNewsletters.filter(
        newsletter => newsletter.subscribers >= filters.minSubscribers!
      );
    }

    if (filters.maxSubscribers) {
      filteredNewsletters = filteredNewsletters.filter(
        newsletter => newsletter.subscribers <= filters.maxSubscribers!
      );
    }

    // Rating filter
    if (filters.minRating) {
      filteredNewsletters = filteredNewsletters.filter(
        newsletter => (newsletter.rating || 0) >= filters.minRating!
      );
    }

    // Sorting (enhanced)
    if (filters.sortBy) {
      filteredNewsletters.sort((a, b) => {
        switch (filters.sortBy) {
          case 'popularity':
            return filters.sortOrder === 'asc'
              ? a.subscribers - b.subscribers
              : b.subscribers - a.subscribers;
          case 'rating':
            return filters.sortOrder === 'asc'
              ? (a.rating || 0) - (b.rating || 0)
              : (b.rating || 0) - (a.rating || 0);
          case 'newest':
            // Simulate newest by using ID as a proxy (assuming higher ID is newer)
            return filters.sortOrder === 'asc'
              ? parseInt(a.id) - parseInt(b.id)
              : parseInt(b.id) - parseInt(a.id);
          default:
            return 0;
        }
      });
    }

    // Pagination
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedNewsletters = filteredNewsletters.slice(startIndex, startIndex + pageSize);

    return {
      newsletters: paginatedNewsletters,
      total: filteredNewsletters.length,
      page,
      pageSize,
    };
  },

  // Fetch a single newsletter by ID
  fetchNewsletterById: async (id: string): Promise<Newsletter | null> => {
    return new Promise(resolve => {
      // First, check predefined newsletters
      const predefinedNewsletter = MOCK_NEWSLETTERS.find(newsletter => newsletter.id === id);

      if (predefinedNewsletter) {
        resolve(predefinedNewsletter);
        return;
      }

      // If not found in predefined, generate a mock newsletter
      const generatedNewsletters = generateMockNewsletters();
      const generatedNewsletter = generatedNewsletters.find(newsletter => newsletter.id === id);

      if (generatedNewsletter) {
        resolve(generatedNewsletter);
        return;
      }

      // If still not found, resolve with null
      console.warn(`No newsletter found with ID: ${id}`);
      resolve(null);
    });
  },

  // Simulate newsletter subscription
  subscribeNewsletter: async (newsletterId: string): Promise<boolean> => {
    await simulateDelay(1000);
    // In a real app, this would call a backend endpoint
    return Math.random() > 0.1; // 90% success rate
  },

  // Simulate newsletter unsubscription
  unsubscribeNewsletter: async (newsletterId: string): Promise<boolean> => {
    await simulateDelay(1000);
    // In a real app, this would call a backend endpoint
    return Math.random() > 0.1; // 90% success rate
  },
};
