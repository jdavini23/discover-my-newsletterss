import { create } from 'zustand';
import { User } from 'firebase/auth';
import { 
  signIn, 
  signUp, 
  logOut, 
  onAuthChange 
} from '@/config/firebase';
import { createUserProfile } from '@/services/firestore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Authentication methods
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  
  // Authentication state management
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
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
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed', 
        isLoading: false 
      });
      throw error;
    }
  },

  register: async (email: string, password: string, name?: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await signUp(email, password);
      
      // Create user profile in Firestore
      await createUserProfile({
        id: user.uid,
        email: user.email || email,
        displayName: name
      });

      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Registration failed', 
        isLoading: false 
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await logOut();
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Logout failed', 
        isLoading: false 
      });
      throw error;
    }
  },

  initializeAuth: () => {
    // Set up authentication state listener
    const unsubscribe = onAuthChange((user) => {
      set({ 
        user, 
        isAuthenticated: !!user, 
        isLoading: false 
      });
    });

    // Return unsubscribe function to clean up listener
    return unsubscribe;
  }
}));
