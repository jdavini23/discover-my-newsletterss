export interface ReadingHistoryItem {
  newsletter: Newsletter;
  readAt: Date;
  readDuration: number; // in seconds
}

interface ReadingHistoryState {
  history: ReadingHistoryItem[];
  addToHistory: (newsletter: Newsletter, readDuration: number) => void;
  getMostReadNewsletters: (limit?: number) => Newsletter[];
  getReadingTimeAnalytics: () => {
    totalReadTime: number;
    averageReadTime: number;
    mostReadCategory: string;
  };
  getRecommendedNewsletters: (limit?: number) => Newsletter[];
}

const useReadingHistoryStore = create<ReadingHistoryState>()(
  persist(
    (set, get) => ({
      history: [],

      addToHistory: (newsletter, readDuration) => {
        set(state => ({
          history: [
            ...state.history,
            {
              newsletter,
              readAt: new Date(),
              readDuration,
            },
          ],
        }));
      },

      getMostReadNewsletters: (limit = 5) => {
        const readCounts = get().history.reduce(
          (acc, item) => {
            const id = item.newsletter.id;
            acc[id] = (acc[id] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        return get()
          .history.filter(
            (item, index, self) =>
              self.findIndex(t => t.newsletter.id === item.newsletter.id) === index
          )
          .sort((a, b) => readCounts[b.newsletter.id] - readCounts[a.newsletter.id])
          .slice(0, limit)
          .map(item => item.newsletter);
      },

      getReadingTimeAnalytics: () => {
        const history = get().history;
        const totalReadTime = history.reduce((sum, item) => sum + item.readDuration, 0);
        const averageReadTime = history.length > 0 ? totalReadTime / history.length : 0;

        const categoryReadTimes = history.reduce(
          (acc, item) => {
            const category = item.newsletter.category;
            acc[category] = (acc[category] || 0) + item.readDuration;
            return acc;
          },
          {} as Record<string, number>
        );

        const mostReadCategory =
          Object.entries(categoryReadTimes).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

        return {
          totalReadTime,
          averageReadTime,
          mostReadCategory,
        };
      },

      getRecommendedNewsletters: (limit = 5) => {
        const history = get().history;
        const categoryPreferences = history.reduce(
          (acc, item) => {
            const category = item.newsletter.category;
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        const topCategories = Object.entries(categoryPreferences)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([category]) => category);

        // In a real-world scenario, you'd fetch newsletters from these categories
        // For now, we'll just return a mock implementation
        return history
          .filter(item => topCategories.includes(item.newsletter.category))
          .map(item => item.newsletter)
          .slice(0, limit);
      },
    }),
    {
      name: 'reading-history-storage',
      version: 1,
    }
  )
);

export default useReadingHistoryStore;
