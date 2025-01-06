export interface UserPreferences {
  id: string;
  favoriteNewsletters: string[];
  interests: string[];
  notificationSettings: {
    email: boolean;
    push: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';
  };
}

export interface UpdateUserPreferencesRequest {
  interests?: string[];
  favoriteNewsletters?: string[];
  notificationSettings?: {
    email?: boolean;
    push?: boolean;
    frequency?: UserPreferences['notificationSettings']['frequency'];
  };
}
