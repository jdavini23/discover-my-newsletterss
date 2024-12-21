import { http, HttpResponse } from 'msw';
import { getCurrentConfig } from '../../../config/environment';

const API_URL = getCurrentConfig().API_URL;

// Initial user preferences state
let userPreferences = {
  id: 'user-1',
  favoriteNewsletters: [],
  interests: ['Technology', 'Business'],
  notificationSettings: {
    email: true,
    push: false,
    frequency: 'weekly',
  },
};

export const userPreferencesHandlers = [
  // Get user preferences
  http.get(`${API_URL}/user/preferences`, () => {
    console.log('MSW Get User Preferences:', userPreferences);
    return HttpResponse.json(userPreferences);
  }),

  // Update user preferences
  http.put(`${API_URL}/user/preferences`, async ({ request }) => {
    const updates = await request.json();
    userPreferences = { ...userPreferences, ...updates };
    console.log('MSW Updated User Preferences:', userPreferences);
    return HttpResponse.json(userPreferences);
  }),

  // Add favorite newsletter
  http.post(`${API_URL}/user/preferences/favorites/:id`, ({ params }) => {
    const { id } = params;
    if (!userPreferences.favoriteNewsletters.includes(id as string)) {
      userPreferences.favoriteNewsletters.push(id as string);
    }
    console.log('MSW Added Favorite:', id);
    return HttpResponse.json(userPreferences);
  }),

  // Remove favorite newsletter
  http.delete(`${API_URL}/user/preferences/favorites/:id`, ({ params }) => {
    const { id } = params;
    userPreferences.favoriteNewsletters = userPreferences.favoriteNewsletters.filter(
      newsletterId => newsletterId !== id
    );
    console.log('MSW Removed Favorite:', id);
    return HttpResponse.json(userPreferences);
  }),

  // Update interests
  http.put(`${API_URL}/user/preferences/interests`, async ({ request }) => {
    const { interests } = await request.json();
    userPreferences.interests = interests;
    console.log('MSW Updated Interests:', interests);
    return HttpResponse.json(userPreferences);
  }),

  // Update notification settings
  http.put(`${API_URL}/user/preferences/notifications`, async ({ request }) => {
    const settings = await request.json();
    userPreferences.notificationSettings = {
      ...userPreferences.notificationSettings,
      ...settings,
    };
    console.log('MSW Updated Notification Settings:', settings);
    return HttpResponse.json(userPreferences);
  }),
];
