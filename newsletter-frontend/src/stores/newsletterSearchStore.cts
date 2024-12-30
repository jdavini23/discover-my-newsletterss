import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { newsletterApi } from '@/services/api/newsletterApi';

interface NewsletterSearchState {
  // Search results
  newsletters: any[];
  total: number;
  page: number;

  // Search parameters
  searchParams: any;

  // Filter options
  categories: string[];
  tags: string[];
  frequencies: string[];

  // UI state
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchNewsletters: () => Promise<void>;
  setSearchParams: (params: any) => void;
  resetSearch: () => void;
  fetchFilterOptions: () => Promise<void>;
}

export const useNewsletterSearchStore = create<NewsletterSearchState>()(
  immer((set, get) => ({
    // Initial state
    newsletters: [],
    total: 0,
    page: 1,

    searchParams: {},

    categories: [],
    tags: [],
    frequencies: [],

    isLoading: false,
    error: null,

    // Fetch newsletters based on current search parameters
    fetchNewsletters: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const result = await newsletterApi.searchNewsletters(get().searchParams);

        set((state) => {
          state.newsletters = result.newsletters;
          state.total = result.total;
          state.page = result.page;
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.isLoading = false;
          state.error = error instanceof Error ? error.message : 'An unexpected error occurred';
        });
      }
    },

    // Update search parameters
    setSearchParams: (params) => {
      set((state) => {
        // Merge new params with existing params
        state.searchParams = { ...state.searchParams, ...params };
      });

      // Automatically trigger search when params change
      get().fetchNewsletters();
    },

    // Reset search to initial state
    resetSearch: () => {
      set((state) => {
        state.searchParams = {};
        state.newsletters = [];
        state.total = 0;
        state.page = 1;
        state.error = null;
      });
    },

    // Fetch available filter options
    fetchFilterOptions: async () => {
      try {
        const options = await newsletterApi.getFilterOptions();

        set((state) => {
          state.categories = options.categories;
          state.tags = options.tags;
          state.frequencies = options.frequencies;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Failed to load filter options';
        });
      }
    },
  }))
);
