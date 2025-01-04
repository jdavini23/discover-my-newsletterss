export interface RecommendationScore {
  newsletterId: string;
  score: number;
  reasons: string[];
}

export interface UserPreference {
  categories: string[];
  topics: string[];
  readingFrequency: 'daily' | 'weekly' | 'monthly';
  excludedNewsletters?: string[];
}

export interface RecommendationContext {
  userId: string;
  preferences: UserPreference;
  currentInterests?: string[];
}

export interface RecommendationEngine {
  generateRecommendations(
    newsletters: Newsletter[],
    context: RecommendationContext
  ): Promise<RecommendationScore[]>;

  updateUserPreferences(userId: string, newPreferences: Partial<UserPreference>): Promise<void>;

  trackUserInteraction(
    userId: string,
    newsletterId: string,
    interactionType: 'view' | 'subscribe' | 'dismiss'
  ): Promise<void>;
}

export type RecommendationAlgorithm =
  | 'content_based' // Recommends based on newsletter content
  | 'collaborative' // Recommends based on user behavior
  | 'hybrid'; // Combines content-based and collaborative approaches
