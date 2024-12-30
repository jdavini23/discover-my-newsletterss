import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../../../config/environment';
import { UserPreferences, UpdateUserPreferencesRequest } from '../../../types/userPreferences';

const mockUserPreferences: UserPreferences = {
  userId: 'user123',
  interests: ['Technology', 'Science'],
  newsletterSubscriptions: ['newsletter1', 'newsletter2'],
  notificationSettings: {
    email: true,
    push: false,
    sms: false
  }
};

export const userPreferencesHandlers = [
  http.get(`${API_BASE_URL}/api/user/preferences`, () => {
    return HttpResponse.json(mockUserPreferences);
  }),

  http.post(`${API_BASE_URL}/api/user/preferences`, async ({ request }) => {
    const body = await request.json() as UpdateUserPreferencesRequest;
    
    return HttpResponse.json({
      ...mockUserPreferences,
      ...body
    });
  })
];
