// Placeholder for root store
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Types for Notification
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

// Notification Store
interface NotificationStore {
  notifications: Notification[];
  addNotification: (message: string, type?: NotificationType) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (message, type = 'info') => 
    set((state) => ({
      notifications: [
        ...state.notifications, 
        { id: uuidv4(), message, type }
      ]
    })),
  removeNotification: (id) => 
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
}));

export const rootStore = {
  useNotificationStore,
};
