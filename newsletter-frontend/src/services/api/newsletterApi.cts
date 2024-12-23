import axios from 'axios';
import { getCurrentConfig } from '../../config/environment';
import type {
  Newsletter,
  NewsletterSearchFilters,
  NewsletterSearchResponse,
} from '../../types/newsletter';

const config = getCurrentConfig();
console.log('API Config:', config);

const api = axios.create({
  baseURL: `${config.API_URL}/newsletters`,
  timeout: 10000,
});

console.log('API Base URL:', api.defaults.baseURL);

export const newsletterApi = {
  async search(filters: NewsletterSearchFilters): Promise<NewsletterSearchResponse> {
    console.log('API Search Request:', filters);
    const { data } = await api.get<NewsletterSearchResponse>('/search', {
      params: filters,
    });
    console.log('API Search Response:', data);
    return data;
  },

  async getById(id: string): Promise<Newsletter> {
    console.log('API Get Newsletter by ID:', id);
    const { data } = await api.get<Newsletter>(`/${id}`);
    console.log('API Get Newsletter Response:', data);
    return data;
  },

  async getRecommended(): Promise<Newsletter[]> {
    console.log('API Get Recommended');
    const { data } = await api.get<Newsletter[]>('/recommended');
    console.log('API Recommended Response:', data);
    return data;
  },

  async getFeatured(): Promise<Newsletter[]> {
    console.log('API Get Featured');
    const { data } = await api.get<Newsletter[]>('/featured');
    console.log('API Featured Response:', data);
    return data;
  },

  async getByCategory(category: string): Promise<Newsletter[]> {
    console.log('API Get by Category:', category);
    const { data } = await api.get<Newsletter[]>(`/category/${category}`);
    console.log('API Category Response:', data);
    return data;
  },

  async subscribe(newsletterId: string): Promise<void> {
    console.log('API Subscribe:', newsletterId);
    await api.post(`/${newsletterId}/subscribe`);
  },

  async unsubscribe(newsletterId: string): Promise<void> {
    console.log('API Unsubscribe:', newsletterId);
    await api.post(`/${newsletterId}/unsubscribe`);
  },
};
