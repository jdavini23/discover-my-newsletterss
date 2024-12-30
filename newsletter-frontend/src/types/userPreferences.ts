export interface UserPreferences {
  id?: string;
  userId: string;
  interests: string[];
  newsletterSubscriptions: string[];
  notificationSettings: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export interface UpdateUserPreferencesRequest {
  userId: string;
  interests?: string[];
  newsletterSubscriptions?: string[];
  notificationSettings?: Partial<UserPreferences['notificationSettings']>;
}
