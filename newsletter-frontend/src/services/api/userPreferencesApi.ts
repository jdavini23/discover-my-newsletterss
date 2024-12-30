import { ENV } from '@/config/environment';
import { UserPreferences } from '@/types/userPreferences';

export const userPreferencesApi = {
  async getUserPreferences(userId: string): Promise<UserPreferences> {
    const response = await fetch(`${ENV.API_BASE_URL}/api/user-preferences/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user preferences');
    }

    return response.json();
  },

  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    const response = await fetch(`${ENV.API_BASE_URL}/api/user-preferences/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      throw new Error('Failed to update user preferences');
    }

    return response.json();
  }
};
