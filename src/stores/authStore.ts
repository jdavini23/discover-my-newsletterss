import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
  checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        console.log('Attempting login for:', email);
        set({ isLoading: true, error: null });
        try {
          const user = await signIn(email, password);
          console.log('Login successful for:', user.uid);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          console.error('Login error:', errorMessage);
          set({
            error: errorMessage,
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      register: async (email: string, password: string, name?: string) => {
        console.log('Attempting registration for:', email);
        set({ isLoading: true, error: null });
        try {
          const userCredential: UserCredential = await signUp(email, password);
          const user = userCredential.user;

          if (name) {
            await createUserProfile(user.uid, {
              name,
              email: user.email || '',
              newsletterPreferences: {},
              activityLog: [],
            });
          }

          console.log('Registration successful for:', user.uid);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Registration failed';
          console.error('Registration error:', errorMessage);
          set({
            error: errorMessage,
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: async () => {
        console.log('Attempting logout');
        set({ isLoading: true, error: null });
        try {
          await logOut();
          console.log('Logout successful');
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Logout failed';
          console.error('Logout error:', errorMessage);
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      checkAuthStatus: async () => {
        console.log('Checking authentication status');
        return new Promise<boolean>((resolve, reject) => {
          try {
            const unsubscribe = onAuthChange(
              user => {
                console.log('Auth status checked. User:', user ? user.uid : 'No user');

                // Unsubscribe immediately to prevent multiple calls
                unsubscribe();

                // Update store state
                set({
                  user,
                  isAuthenticated: !!user,
                  isLoading: false,
                  error: null,
                });

                // Resolve with authentication status
                resolve(!!user);
              },
              error => {
                console.error('Auth status check error:', error);

                // Unsubscribe on error
                unsubscribe();

                // Update store state with error
                set({
                  error: error instanceof Error ? error.message : 'Authentication check failed',
                  isLoading: false,
                  user: null,
                  isAuthenticated: false,
                });

                // Reject the promise with the error
                reject(error);
              }
            );

            // Fallback timeout
            const timeoutId = setTimeout(() => {
              console.log('Auth status check timed out');
              unsubscribe();
              set({
                isLoading: false,
                error: 'Authentication check timed out',
              });
              reject(new Error('Authentication check timed out'));
            }, 10000); // Increased timeout to 10 seconds
          } catch (error) {
            console.error('Unexpected error in checkAuthStatus:', error);
            set({
              error:
                error instanceof Error
                  ? error.message
                  : 'Unexpected error during authentication check',
              isLoading: false,
              user: null,
              isAuthenticated: false,
            });
            reject(error);
          }
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
