import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode'; // Import jwtDecode correctly
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
          const decodedUser = jwtDecode(token) as JWTPayload; // Use jwtDecode correctly
          
          // Set secure HTTP-only cookie
          Cookies.set('authToken', token, { 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(decodedUser.exp * 1000)
          });

          set({ 
            user: {
              id: decodedUser.id,
              email: decodedUser.email,
              name: decodedUser.name,
              roles: decodedUser.roles
            }, 
            token 
          });
        } catch (error) {
          console.error('Login failed', error);
          throw new Error('Login failed');
        }
      },

      register: async (email: string, password: string, name?: string) => {
        try {
          const response = await api.post('/auth/register', { 
            email, 
            password, 
            name 
          });
          const { token } = response.data;
          
          // Decode token to extract user info
          const decodedUser = jwtDecode(token) as JWTPayload; // Use jwtDecode correctly
          
          // Set secure HTTP-only cookie
          Cookies.set('authToken', token, { 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(decodedUser.exp * 1000)
          });

          set({ 
            user: {
              id: decodedUser.id,
              email: decodedUser.email,
              name: decodedUser.name,
              roles: decodedUser.roles
            }, 
            token 
          });
        } catch (error) {
          console.error('Registration failed', error);
          throw new Error('Registration failed');
        }
      },

      logout: () => {
        // Remove token from cookies
        Cookies.remove('authToken');
        
        set({ 
          user: null, 
          token: null 
        });
      },

      isAuthenticated: () => {
        const { token } = get();
        if (!token) return false;

        try {
          // Check token expiration
          const decoded = jwtDecode(token) as JWTPayload; // Use jwtDecode correctly
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
          const decodedUser = jwtDecode(token) as JWTPayload; // Use jwtDecode correctly
          
          // Set secure HTTP-only cookie
          Cookies.set('authToken', token, { 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(decodedUser.exp * 1000)
          });

          set({ 
            user: {
              id: decodedUser.id,
              email: decodedUser.email,
              name: decodedUser.name,
              roles: decodedUser.roles
            }, 
            token 
          });
        } catch (error) {
          console.error('Token refresh failed', error);
          get().logout(); // Logout if refresh fails
          throw new Error('Token refresh failed');
        }
      }
    }),
    {
      name: 'auth-storage', // unique name
      storage: {
        getItem: (name) => localStorage.getItem(name),
        setItem: (name, value) => localStorage.setItem(name, value),
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
);
