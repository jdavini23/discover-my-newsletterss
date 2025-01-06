import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserCredential } from 'firebase/auth';
import { signIn, signUp, logOut, onAuthChange } from '@/config/firebase';
import { createUserProfile } from '@/services/firestore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await signIn(email, password);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      register: async (email: string, password: string, name?: string) => {
        set({ isLoading: true, error: null });
        try {
          const userCredential: UserCredential = await signUp(email, password);

          if (name) {
            await createUserProfile(userCredential.user, { name });
          }

          set({
            user: userCredential.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await logOut();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Logout failed',
            isLoading: false,
          });
          throw error;
        }
      },

      initializeAuth: async () => {
        try {
          const unsubscribe = onAuthChange(async user => {
            if (user) {
              set({
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            } else {
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              });
            }
          });

          // Return a cleanup function to unsubscribe from auth changes
          return () => unsubscribe();
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Authentication initialization failed',
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
