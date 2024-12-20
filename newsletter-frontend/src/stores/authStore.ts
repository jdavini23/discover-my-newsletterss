import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { api } from '../services/api';

interface JWTPayload {
  id: string;
  email: string;
  name: string;
  roles?: string[];
  exp: number;
}

interface AuthState {
  token: string | null;
  user: {
    id: string;
    email: string;
    name: string;
    roles?: string[];
  } | null;
  isAuthenticated: () => boolean;
  login: (token: string) => void;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  decodeToken: (token: string) => { 
    id: string; 
    email: string; 
    name: string;
    roles?: string[];
  } | null;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      isAuthenticated: () => {
        const { token } = get();
        if (!token) return false;

        try {
          const decodedToken = jwtDecode<JWTPayload>(token);
          return decodedToken.exp > Date.now() / 1000;
        } catch {
          return false;
        }
      },

      decodeToken: (token: string) => {
        try {
          const decoded = jwtDecode<JWTPayload>(token);
          return {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            roles: decoded.roles
          };
        } catch {
          return null;
        }
      },

      login: (token: string) => {
        const userInfo = get().decodeToken(token);
        set({ 
          token, 
          user: userInfo 
        });
      },

      register: async (email: string, password: string, name?: string) => {
        try {
          const response = await api.post('/auth/register', {
            email,
            password,
            name,
          });
          const { token } = response.data;
          
          const userInfo = get().decodeToken(token);
          set({ 
            token, 
            user: userInfo 
          });
        } catch (error) {
          throw new Error('Registration failed. Please try again.');
        }
      },

      logout: () => {
        set({ token: null, user: null });
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
      }
    }),
    {
      name: 'auth-storage',
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
      }
    }
  )
);
