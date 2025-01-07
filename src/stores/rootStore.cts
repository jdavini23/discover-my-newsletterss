import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// User State Interface
interface UserState {
  user: {
    id?: string;
    email?: string;
    name?: string;
    isAuthenticated: boolean;
    mfaEnabled: boolean;
  };
  setUser: (userData: Partial<UserState['user']>) => void;
  clearUser: () => void;
}

// Newsletter State Interface
interface NewsletterState {
  newsletters: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
  }>;
  selectedNewsletter: string | null;
  setNewsletters: (newsletters: NewsletterState['newsletters']) => void;
  selectNewsletter: (id: string) => void;
}

// Notification State Interface
interface NotificationState {
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>;
  addNotification: (notification: Omit<NotificationState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
}

// Create User Store
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      set => ({
        user: {
          isAuthenticated: false,
          mfaEnabled: false,
        },
        setUser: userData =>
          set(state => ({
            user: { ...state.user, ...userData },
          })),
        clearUser: () =>
          set({
            user: {
              isAuthenticated: false,
              mfaEnabled: false,
            },
          }),
      }),
      { name: 'user-storage' }
    )
  )
);

// Create Newsletter Store
export const useNewsletterStore = create<NewsletterState>()(
  devtools(set => ({
    newsletters: [],
    selectedNewsletter: null,
    setNewsletters: newsletters => set({ newsletters }),
    selectNewsletter: id => set({ selectedNewsletter: id }),
  }))
);

// Create Notification Store
export const useNotificationStore = create<NotificationState>()(
  devtools(set => ({
    notifications: [],
    addNotification: notification =>
      set(state => ({
        notifications: [...state.notifications, { ...notification, id: Date.now().toString() }],
      })),
    removeNotification: id =>
      set(state => ({
        notifications: state.notifications.filter(n => n.id !== id),
      })),
  }))
);
