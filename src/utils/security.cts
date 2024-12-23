import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface CSRFResponse {
  csrfToken: string;
  cookieName: string;
}

class SecurityService {
  private static instance: SecurityService;
  private axiosInstance: AxiosInstance;
  private csrfToken: string | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true, // Required for CSRF cookie
    });

    // Add request interceptor to attach CSRF token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        if (!this.csrfToken) {
          await this.refreshCsrfToken();
        }

        if (this.csrfToken) {
          config.headers['X-CSRF-Token'] = this.csrfToken;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor to handle CSRF token expiration
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 403 &&
          error.response?.data?.error === 'CSRF Validation Failed'
        ) {
          // Token might be expired, refresh it
          await this.refreshCsrfToken();

          // Retry the original request
          const config = error.config;
          config.headers['X-CSRF-Token'] = this.csrfToken;
          return this.axiosInstance.request(config);
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  private async refreshCsrfToken(): Promise<void> {
    try {
      const response = await axios.get<CSRFResponse>(
        `${process.env.REACT_APP_API_URL}/api/csrf-token`,
        { withCredentials: true }
      );
      this.csrfToken = response.data.csrfToken;
    } catch (error) {
      console.error('Failed to refresh CSRF token:', error);
      throw error;
    }
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Enhanced error handling
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(`Request failed: ${errorMessage}`);
      }
      throw error;
    }
  }

  // Helper methods for common HTTP methods
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }
}

export const securityService = SecurityService.getInstance();
