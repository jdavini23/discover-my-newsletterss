import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../../config/environment';

const mockNewsletters = [
  {
    id: '1',
    title: 'Tech Weekly',
    description: 'Latest in technology',
    categories: ['Technology'],
    frequency: 'Weekly',
    subscriberCount: 1000,
    url: 'https://techweekly.com',
  },
  {
    id: '2',
    title: 'Finance Today',
    description: 'Daily financial updates',
    categories: ['Finance'],
    frequency: 'Daily',
    subscriberCount: 2000,
    url: 'https://financetoday.com',
  },
];

const mockFilterOptions = {
  categories: ['Technology', 'Finance', 'Health', 'Sports'],
  tags: ['AI', 'Blockchain', 'Investing', 'Wellness'],
  frequencies: ['Daily', 'Weekly', 'Monthly'],
};

export const handlers = [
  // Newsletter search
  http.get(`${API_BASE_URL}/api/newsletters`, async ({ request, params, cookies }) => {
    return HttpResponse.json({
      newsletters: mockNewsletters,
      total: mockNewsletters.length,
      page: 1,
      pageSize: 10
    });
  }),

  // Filter options
  http.get(`${API_BASE_URL}/api/newsletters/filter-options`, async ({ request, params, cookies }) => {
    return HttpResponse.json(mockFilterOptions);
  }),

  // Auth endpoints
  http.post(`${API_BASE_URL}/api/auth/login`, async ({ request, params, cookies }) => {
    return HttpResponse.json({
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      }
    });
  }),

  http.post(`${API_BASE_URL}/api/auth/register`, async ({ request, params, cookies }) => {
    return HttpResponse.json({
      user: {
        id: 'new_user_123',
        email: 'newuser@example.com',
        name: 'New User'
      }
    });
  }),

  http.post(`${API_BASE_URL}/api/auth/reset-password`, async ({ request, params, cookies }) => {
    return HttpResponse.json({
      message: 'Password reset link sent',
      resetToken: 'mock_reset_token_789'
    });
  }),

  http.post(`${API_BASE_URL}/api/auth/confirm-reset`, async ({ request, params, cookies }) => {
    return HttpResponse.json({
      message: 'Password reset successful'
    });
  })
];
