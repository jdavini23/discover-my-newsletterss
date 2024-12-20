import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import * as jwtDecode from 'jwt-decode';
import { api } from '../services/api';

export interface User {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
}

interface JWTPayload extends User {
  exp: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  refreshToken: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: async (email: string, password: string) => {
        try {
          const response = await api.post('/auth/login', { email, password });
          const { token } = response.data;

          // Decode token to extract user info
          const decodedUser = jwtDecode.default(token) as JWTPayload;

          // Set secure HTTP-only cookie
          Cookies.set('authToken', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(decodedUser.exp * 1000),
          });

          set({
            user: {
              id: decodedUser.id,
              email: decodedUser.email,
              name: decodedUser.name,
              roles: decodedUser.roles,
            },
            token,
          });
        } catch (error) {
          throw new Error('Login failed. Please check your credentials.');
        }
      },

      register: async (email: string, password: string, name?: string) => {
        try {
          const response = await api.post('/auth/register', {
            email,
            password,
            name,
          });
          const { token } = response.data;

          // Decode token to extract user info
          const decodedUser = jwtDecode.default(token) as JWTPayload;

          // Set secure HTTP-only cookie
          Cookies.set('authToken', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(decodedUser.exp * 1000),
          });

          set({
            user: {
              id: decodedUser.id,
              email: decodedUser.email,
              name: decodedUser.name,
              roles: decodedUser.roles,
            },
            token,
          });
        } catch (error) {
          throw new Error('Registration failed. Please try again.');
        }
      },

      logout: () => {
        Cookies.remove('authToken');
        set({ user: null, token: null });
      },

      isAuthenticated: () => {
        const token = Cookies.get('authToken');

        if (!token) return false;

        try {
          // Check token expiration
          const decoded = jwtDecode.default(token) as JWTPayload;
          return decoded.exp > Date.now() / 1000;
        } catch {
          return false;
        }
      },

      refreshToken: async () => {
        try {
          const response = await api.post('/auth/refresh-token');
          const { token } = response.data;

          // Decode token to extract user info
          const decodedUser = jwtDecode.default(token) as JWTPayload;

          // Set secure HTTP-only cookie
          Cookies.set('authToken', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(decodedUser.exp * 1000),
          });

          set({
            user: {
              id: decodedUser.id,
              email: decodedUser.email,
              name: decodedUser.name,
              roles: decodedUser.roles,
            },
            token,
          });
        } catch (error) {
          // If refresh fails, log out the user
          get().logout();
          throw new Error('Session expired. Please log in again.');
        }
      },

      requestPasswordReset: async (email: string) => {
        try {
          await api.post('/auth/request-password-reset', { email });
        } catch (error) {
          throw new Error('Failed to send password reset link. Please try again.');
        }
      },

      resetPassword: async (token: string, newPassword: string) => {
        try {
          await api.post('/auth/reset-password', { token, newPassword });
        } catch (error) {
          throw new Error('Failed to reset password. Please try again.');
        }
      },
    }),
    {
      name: 'auth-storage', // unique name
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
