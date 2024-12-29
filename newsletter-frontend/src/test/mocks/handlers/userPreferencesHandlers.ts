import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:3000';

export const userPreferencesHandlers = [
  http.get(`${API_BASE_URL}/api/user-preferences`, () => {
    return HttpResponse.json({
      categories: ['Technology', 'Business', 'Science'],
      frequency: 'Weekly',
      emailNotifications: true,
      theme: 'light'
    });
  }),

  http.put(`${API_BASE_URL}/api/user-preferences`, async ({ request }) => {
    const preferences = await request.json();
    return HttpResponse.json({
      message: 'Preferences updated successfully',
      preferences
    });
  }),

  http.get(`${API_BASE_URL}/api/user-preferences/categories`, () => {
    return HttpResponse.json([
      'Technology',
      'Business',
      'Science',
      'Health',
      'Sports',
      'Entertainment',
      'Politics',
      'Education'
    ]);
  })
];
