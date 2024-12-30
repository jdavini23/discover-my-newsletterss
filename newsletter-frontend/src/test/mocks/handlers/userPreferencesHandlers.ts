import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:3000';

const mockUserPreferences = {
  categories: ['Technology', 'Finance'],
  frequency: 'weekly',
  language: 'en',
};

export const userPreferencesHandlers = [
  http.get(`${API_BASE_URL}/api/user/preferences`, () => {
    return HttpResponse.json(mockUserPreferences);
  }),

  http.post(`${API_BASE_URL}/api/user/preferences`, () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
