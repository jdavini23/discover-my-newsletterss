import { ENV } from '@/config/environment';

export interface Newsletter {
  id: string;
  title: string;
  description: string;
  subscribers: number;
  categories: string[];
}

export interface NewsletterSearchParams {
  query?: string;
  categories?: string[];
  page?: number;
  limit?: number;
}

export interface NewsletterSearchResult {
  newsletters: Newsletter[];
  total: number;
  page: number;
  totalPages: number;
}

export const newsletterApi = {
  async searchNewsletters(params: NewsletterSearchParams): Promise<NewsletterSearchResult> {
    const response = await fetch(`${ENV.API_BASE_URL}/api/newsletters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch newsletters');
    }

    return response.json();
  },

  async getFilterOptions() {
    const response = await fetch(`${ENV.API_BASE_URL}/api/newsletters/filter-options`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch filter options');
    }

    return response.json();
  }
};
