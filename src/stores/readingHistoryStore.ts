import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReadingHistoryItem {
  newsletterId: string;
  newsletterTitle: string;
  readAt: Date;
}

interface ReadingHistoryState {
  history: ReadingHistoryItem[];
  addToHistory: (newsletterId: string, newsletterTitle: string) => void;
  removeFromHistory: (newsletterId: string) => void;
  clearHistory: () => void;
}

const useReadingHistoryStore = create<ReadingHistoryState>(
  persist(
    set => ({
      history: [],

      addToHistory: (newsletterId, newsletterTitle) =>
        set(state => {
          // Prevent duplicates and keep only unique entries
          const existingIndex = state.history.findIndex(item => item.newsletterId === newsletterId);

          if (existingIndex !== -1) {
            // Update timestamp if already exists
            const updatedHistory = [...state.history];
            updatedHistory[existingIndex] = {
              newsletterId,
              newsletterTitle,
              readAt: new Date(),
            };
            return { history: updatedHistory };
          }

          // Add new entry, limit to last 50 items
          const newHistory = [
            { newsletterId, newsletterTitle, readAt: new Date() },
            ...state.history.slice(0, 49),
          ];

          return { history: newHistory };
        }),

      removeFromHistory: newsletterId =>
        set(state => ({
          history: state.history.filter(item => item.newsletterId !== newsletterId),
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'reading-history-storage', // unique name
      getStorage: () => localStorage, // use localStorage for persistence
    }
  )
);

export default useReadingHistoryStore;
