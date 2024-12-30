import { create } from 'zustand';
import { Newsletter } from '../types/newsletter.ts';

interface SearchParams {
  query?: string;
  categories?: string[];
  page?: number;
  pageSize?: number;
}

interface NewsletterSearchState {
  newsletters: Newsletter[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  total: number;
  searchParams: SearchParams;
  categories: string[];
  tags: string[];
  frequencies: string[];
  fetchNewsletters: (params?: SearchParams) => Promise<void>;
  fetchFilterOptions: () => Promise<void>;
  setSearchParams: (params: SearchParams) => void;
  resetSearch: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const useNewsletterSearchStore = create<NewsletterSearchState>((set, get) => ({
  newsletters: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  searchParams: {
    page: 1,
    pageSize: 10,
  },
  categories: [],
  tags: [],
  frequencies: [],

  fetchNewsletters: async (params?: SearchParams) => {
    set({ loading: true, error: null });
    try {
      const searchParams = new URLSearchParams();
      const currentParams = { ...get().searchParams, ...params };
      
      if (currentParams.query) {
        searchParams.append('query', currentParams.query);
      }
      if (currentParams.categories?.length) {
        currentParams.categories.forEach(category => 
          searchParams.append('categories', category)
        );
      }
      if (currentParams.page) {
        searchParams.append('page', currentParams.page.toString());
      }
      if (currentParams.pageSize) {
        searchParams.append('pageSize', currentParams.pageSize.toString());
      }

      const response = await fetch(`${API_BASE_URL}/api/newsletters/search?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch newsletters');
      }

      const data = await response.json();
      set({
        newsletters: data.newsletters,
        currentPage: data.page,
        pageSize: data.pageSize,
        total: data.total,
        searchParams: currentParams,
        loading: false,
      });
    } catch (error) {
      set({ 
        error: 'Network error',
        newsletters: [],
        loading: false,
      });
    }
  },

  fetchFilterOptions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletters/filters`);
      if (!response.ok) {
        throw new Error('Failed to fetch filter options');
      }

      const data = await response.json();
      set({
        categories: data.categories,
        tags: data.tags,
        frequencies: data.frequencies,
        loading: false,
      });
    } catch (error) {
      set({ 
        error: 'Network error',
        categories: [],
        tags: [],
        frequencies: [],
        loading: false,
      });
    }
  },

  setSearchParams: (params: SearchParams) => {
    set(state => ({
      searchParams: {
        ...state.searchParams,
        ...params,
      }
    }));
  },

  resetSearch: () => {
    set({
      newsletters: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchParams: {
        page: 1,
        pageSize: 10,
      },
      error: null,
      categories: [],
      tags: [],
      frequencies: [],
    });
  },
}));
