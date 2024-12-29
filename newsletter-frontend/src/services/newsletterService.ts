import axios from 'axios';

interface Newsletter {
  id: string;
  title: string;
  description: string;
  categories: string[];
  frequency: string;
  subscriberCount: number;
  url: string;
}

interface SearchParams {
  query: string;
  page: number;
  pageSize: number;
}

interface SearchResponse {
  newsletters: Newsletter[];
  total: number;
  page: number;
  pageSize: number;
}

class NewsletterService {
  private baseUrl = import.meta.env.VITE_API_BASE_URL;

  async searchNewsletters(params: SearchParams): Promise<SearchResponse> {
    const response = await axios.get(`${this.baseUrl}/api/newsletters/search`, {
      params,
    });
    return response.data;
  }

  async getNewsletter(id: string): Promise<Newsletter> {
    const response = await axios.get(`${this.baseUrl}/api/newsletters/${id}`);
    return response.data;
  }

  async subscribeToNewsletter(newsletterId: string): Promise<void> {
    await axios.post(`${this.baseUrl}/api/newsletters/${newsletterId}/subscribe`);
  }

  async unsubscribeFromNewsletter(newsletterId: string): Promise<void> {
    await axios.post(`${this.baseUrl}/api/newsletters/${newsletterId}/unsubscribe`);
  }
}

export const newsletterService = new NewsletterService();
