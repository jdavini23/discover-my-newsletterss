import axios from 'axios';
import Cookies from 'js-cookie';

// Define types for newsletter and other data
export interface Newsletter {
  id: string;
  name: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface NewsletterCreateData {
  name: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
}

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh and errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { token } = response.data;

        // Update cookie with new token
        Cookies.set('authToken', token, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          expires: 7, // 7 days
        });

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout user
        Cookies.remove('authToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Authentication service methods
export const authService = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (email: string, password: string) => api.post('/auth/register', { email, password }),
};

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
    const response = await api.patch<Newsletter>(`/newsletters/${id}`, data);
    return response.data;
  },

  async deleteNewsletter(id: string) {
    const response = await api.delete<void>(`/newsletters/${id}`);
    return response.data;
  },
};

export default api;
