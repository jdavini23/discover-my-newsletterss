import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  newsletterService,
  Newsletter,
  NewsletterSearchParams,
  NewsletterSearchResult,
} from '../services/newsletterService';

interface NewsletterSearchState {
  // Search results
  newsletters: Newsletter[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;

  // Search parameters
  searchParams: NewsletterSearchParams;

  // Filter options
  categories: string[];
  tags: string[];
  frequencies: string[];

  // UI state
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchNewsletters: () => Promise<void>;
  setSearchParams: (params: Partial<NewsletterSearchParams>) => void;
  resetSearch: () => void;
  fetchFilterOptions: () => Promise<void>;
}

export const useNewsletterSearchStore = create<NewsletterSearchState>()(
  immer((set, get) => ({
    // Initial state
    newsletters: [],
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,

    searchParams: {
      page: 1,
      pageSize: 10,
    },

    categories: [],
    tags: [],
    frequencies: ['daily', 'weekly', 'monthly'],

    isLoading: false,
    error: null,

    // Fetch newsletters based on current search parameters
    fetchNewsletters: async () => {
      set(state => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const result = await newsletterService.searchNewsletters(get().searchParams);

        set(state => {
          state.newsletters = result.newsletters;
          state.total = result.total;
          state.page = result.page;
          state.pageSize = result.pageSize;
          state.totalPages = result.totalPages;
          state.isLoading = false;
        });
      } catch (error) {
        set(state => {
          state.isLoading = false;
          state.error = error instanceof Error ? error.message : 'An unexpected error occurred';
        });
      }
    },

    // Update search parameters
    setSearchParams: params => {
      set(state => {
        // Merge new params with existing params
        state.searchParams = { ...state.searchParams, ...params };
      });

      // Automatically trigger search when params change
      get().fetchNewsletters();
    },

    // Reset search to initial state
    resetSearch: () => {
      set(state => {
        state.searchParams = { page: 1, pageSize: 10 };
        state.newsletters = [];
        state.total = 0;
        state.page = 1;
        state.error = null;
      });
    },

    // Fetch available filter options
    fetchFilterOptions: async () => {
      try {
        const options = await newsletterService.getFilterOptions();

        set(state => {
          state.categories = options.categories;
          state.tags = options.tags;
          state.frequencies = options.frequencies;
        });
      } catch (error) {
        set(state => {
          state.error = error instanceof Error ? error.message : 'Failed to load filter options';
        });
      }
    },
  }))
);
