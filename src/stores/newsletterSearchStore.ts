import { create } from 'zustand';

// Define the shape of the newsletter search state
export interface NewsletterSearchState {
  searchQuery: string;
  results: unknown[];
  isLoading: boolean;
  error: string | null;
  setSearchQuery: (query: string) => void;
  performSearch: () => Promise<void>;
  clearSearch: () => void;
}

// Mock newsletter search store for Ladle stories
export const useNewsletterSearchStore = create<NewsletterSearchState>((set, get) => ({
  searchQuery: '',
  results: [],
  isLoading: false,
  error: null,

  setSearchQuery: query => set({ searchQuery: query }),

  performSearch: async () => {
    const { searchQuery } = get();

    // Simulate search loading
    set({ isLoading: true, error: null });

    try {
      // Simulated search results
      const mockResults = [
        {
          id: 1,
          title: 'Tech Weekly',
          description: 'Latest technology news and insights',
          tags: ['Technology', 'Innovation'],
          subscriberCount: 5000,
        },
        {
          id: 2,
          title: 'Science Digest',
          description: 'Cutting-edge scientific discoveries',
          tags: ['Science', 'Research'],
          subscriberCount: 3000,
        },
        {
          id: 3,
          title: 'Business Insider',
          description: 'Global business trends and analysis',
          tags: ['Business', 'Finance'],
          subscriberCount: 7500,
        },
      ];

      // Filter mock results based on search query
      const filteredResults = searchQuery
        ? mockResults.filter(
            newsletter =>
              newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              newsletter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              newsletter.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        : mockResults;

      set({
        results: filteredResults,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  clearSearch: () =>
    set({
      searchQuery: '',
      results: [],
      isLoading: false,
      error: null,
    }),
}));
