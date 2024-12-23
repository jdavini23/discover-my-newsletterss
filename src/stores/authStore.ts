import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: () => boolean;
  login: (userData: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: () => !!get().token,
      login: (userData, token) => set({ user: userData, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      // Optional: specify which parts of the state to persist
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
