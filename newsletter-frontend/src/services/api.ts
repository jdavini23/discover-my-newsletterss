import axios from 'axios';

// Define types for newsletter and other data
export interface Newsletter {
  id?: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  frequency?: string;
  language?: string;
}

interface NewsletterCreateData {
  title: string;
  description: string;
  url: string;
  tags: string[];
  frequency?: string;
  language?: string;
}

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Newsletter-specific service methods
export const newsletterService = {
  async getNewsletters() {
    const response = await api.get<Newsletter[]>('/newsletters');
    return response.data;
  },

  async createNewsletter(data: NewsletterCreateData) {
    const response = await api.post<Newsletter>('/newsletters', data);
    return response.data;
  },

  async updateNewsletter(id: string, data: Partial<Newsletter>) {
    const response = await api.put<Newsletter>(`/newsletters/${id}`, data);
    return response.data;
  },

  async deleteNewsletter(id: string) {
    const response = await api.delete<void>(`/newsletters/${id}`);
    return response.data;
  },
};

export default api;
