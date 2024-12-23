import axios from 'axios';
import { z } from 'zod';

// Newsletter Schema for type safety and validation
export const NewsletterSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  subscriberCount: z.number().int().min(0),
  coverImageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});

export type Newsletter = z.infer<typeof NewsletterSchema>;

// Search Parameters Schema
export const NewsletterSearchParamsSchema = z.object({
  query: z.string().optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  minSubscribers: z.number().int().min(0).optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
});

export type NewsletterSearchParams = z.infer<typeof NewsletterSearchParamsSchema>;

// Search Result Schema
export const NewsletterSearchResultSchema = z.object({
  newsletters: z.array(NewsletterSchema),
  total: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
  totalPages: z.number().int(),
});

export type NewsletterSearchResult = z.infer<typeof NewsletterSearchResultSchema>;

class NewsletterService {
  private axiosInstance;

  constructor() {
    // Create axios instance with base URL and default config
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for testing
    if (process.env.NODE_ENV === 'test') {
      this.axiosInstance.interceptors.request.use((config) => {
        // Override baseURL for tests
        config.baseURL = 'http://localhost:3000/api';
        return config;
      });
    }
  }

  // Search newsletters with advanced filtering
  async searchNewsletters(params: NewsletterSearchParams): Promise<NewsletterSearchResult> {
    try {
      // Validate input parameters
      const validatedParams = NewsletterSearchParamsSchema.parse(params);

      // Use relative URL for testing
      const response = await this.axiosInstance.get<NewsletterSearchResult>('/newsletters/search', {
        params: validatedParams,
      });

      // Validate response data
      return NewsletterSearchResultSchema.parse(response.data);
    } catch (error) {
      // Centralized error handling
      this.handleError(error);
      throw error;
    }
  }

  // Get newsletter categories and tags for filtering
  async getFilterOptions(): Promise<{
    categories: string[];
    tags: string[];
    frequencies: string[];
  }> {
    try {
      const response = await this.axiosInstance.get('/newsletters/filter-options');
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get newsletter details
  async getNewsletterById(id: string): Promise<Newsletter> {
    try {
      const response = await this.axiosInstance.get<Newsletter>(`/newsletters/${id}`);
      return NewsletterSchema.parse(response.data);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Private error handling method
  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      // Log specific axios errors
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });
    } else {
      // Log other errors
      console.error('Service Error:', error);
    }
  }
}

export const newsletterService = new NewsletterService();
