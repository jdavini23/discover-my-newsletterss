import { create } from 'zustand';
import { recommendationService } from '@/services/recommendationService';
import { Newsletter } from '@/types/firestore';
import { auth } from '@/config/firebase';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface RecommendationState {
  recommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
  fetchRecommendations: () => Promise<void>;
}

export const useRecommendationStore = create<RecommendationState>((set) => ({
  recommendations: [],
  isLoading: false,
  error: null,

  fetchRecommendations: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = auth.currentUser;
      if (!user) {
        set({ recommendations: [], isLoading: false });
        return;
      }

      const recommendations = await recommendationService.generateRecommendations({
        userId: user.uid,
        topics: [], // You can populate this from user preferences
      });

      const formattedRecommendations: Recommendation[] = recommendations.map((rec) => ({
        id: rec.newsletterId,
        title: rec.newsletter.title,
        description: rec.newsletter.description,
        imageUrl: rec.newsletter.coverImageUrl || '/default-newsletter-image.jpg',
      }));

      set({
        recommendations: formattedRecommendations,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch recommendations',
        isLoading: false,
        recommendations: [],
      });
    }
  },
}));
