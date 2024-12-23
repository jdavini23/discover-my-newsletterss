import axios from 'axios';
import { getCurrentConfig } from '../../config/environment';
import type { UserPreferences, UpdateUserPreferencesRequest } from '../../types/userPreferences';

const config = getCurrentConfig();
console.log('User Preferences API Config:', config);

const api = axios.create({
  baseURL: `${config.API_URL}/user/preferences`,
  timeout: 10000,
});

console.log('User Preferences API Base URL:', api.defaults.baseURL);

export const userPreferencesApi = {
  async get(): Promise<UserPreferences> {
    console.log('Fetching user preferences');
    const { data } = await api.get<UserPreferences>('');
    console.log('User preferences response:', data);
    return data;
  },

  async update(preferences: UpdateUserPreferencesRequest): Promise<UserPreferences> {
    console.log('Updating user preferences:', preferences);
    const { data } = await api.put<UserPreferences>('', preferences);
    console.log('Update response:', data);
    return data;
  },

  async addFavorite(newsletterId: string): Promise<UserPreferences> {
    console.log('Adding favorite:', newsletterId);
    const { data } = await api.post<UserPreferences>(`/favorites/${newsletterId}`);
    console.log('Add favorite response:', data);
    return data;
  },

  async removeFavorite(newsletterId: string): Promise<UserPreferences> {
    console.log('Removing favorite:', newsletterId);
    const { data } = await api.delete<UserPreferences>(`/favorites/${newsletterId}`);
    console.log('Remove favorite response:', data);
    return data;
  },

  async updateInterests(interests: string[]): Promise<UserPreferences> {
    console.log('Updating interests:', interests);
    const { data } = await api.put<UserPreferences>('/interests', { interests });
    console.log('Update interests response:', data);
    return data;
  },

  async updateNotificationSettings(
    settings: UserPreferences['notificationSettings']
  ): Promise<UserPreferences> {
    console.log('Updating notification settings:', settings);
    const { data } = await api.put<UserPreferences>('/notifications', settings);
    console.log('Update notifications response:', data);
    return data;
  },
};
