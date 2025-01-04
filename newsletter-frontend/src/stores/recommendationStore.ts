interface RecommendationState {
  recommendations: Newsletter[];
  trendingNewsletters: Newsletter[];
  isLoading: boolean;
  error: string | null;

  fetchRecommendations: (context: RecommendationContext) => Promise<void>;
  fetchTrendingNewsletters: () => Promise<void>;
  setManualRecommendations: (newsletters: Newsletter[]) => void;
  resetRecommendations: () => void;
}

export const useRecommendationStore = create<RecommendationState>()(
  devtools(
    persist(
      (set, get) => ({
        recommendations: [],
        trendingNewsletters: [],
        isLoading: false,
        error: null,

        fetchRecommendations: async (context: RecommendationContext) => {
          // Prevent multiple simultaneous fetches
          if (get().isLoading) return;

          set({ isLoading: true, error: null });

          try {
            console.log('Fetching recommendations with context:', context);

            // Fetch newsletters
            const newsletters = await recommendationService.fetchNewsletters();

            // Generate recommendations
            const recommendationScores =
              await recommendationService.generateRecommendations(context);

            // Map scores to full newsletter objects
            const recommendedNewsletters = recommendationScores
              .map(score => newsletters.find(nl => nl.id === score.newsletterId))
              .filter((nl): nl is Newsletter => nl !== undefined);

            console.log(
              'Generated Recommendations:',
              recommendedNewsletters.map(nl => nl.title)
            );

            set({
              recommendations: recommendedNewsletters,
              isLoading: false,
            });
          } catch (error) {
            console.error('Failed to fetch recommendations:', error);
            set({
              recommendations: [],
              isLoading: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            });
          }
        },

        fetchTrendingNewsletters: async () => {
          set({ isLoading: true, error: null });

          try {
            const trendingNewsletters = await recommendationService.fetchTrendingNewsletters();

            console.log(
              'Trending Newsletters:',
              trendingNewsletters.map(nl => nl.title)
            );

            set({
              trendingNewsletters,
              isLoading: false,
            });
          } catch (error) {
            console.error('Failed to fetch trending newsletters:', error);
            set({
              trendingNewsletters: [],
              isLoading: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            });
          }
        },

        setManualRecommendations: newsletters => {
          set({ recommendations: newsletters });
        },

        resetRecommendations: () => {
          set({ recommendations: [], trendingNewsletters: [] });
        },
      }),
      {
        name: 'recommendation-storage',
        partialize: state => ({
          recommendations: state.recommendations,
          trendingNewsletters: state.trendingNewsletters,
        }),
      }
    )
  )
);
