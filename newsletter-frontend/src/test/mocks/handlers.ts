import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:3000';

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
  http.get(`${API_BASE_URL}/api/newsletters`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        newsletters: mockNewsletters,
        total: mockNewsletters.length,
        page: 1,
        pageSize: 10,
      })
    );
  }),

  // Filter options
  http.get(`${API_BASE_URL}/api/newsletters/filter-options`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockFilterOptions)
    );
  }),

  // Auth endpoints
  http.post(`${API_BASE_URL}/api/auth/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-token',
        user: {
          id: '1',
          email: 'test@example.com',
        },
      })
    );
  }),

  http.post(`${API_BASE_URL}/api/auth/register`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-token',
        user: {
          id: '1',
          email: 'test@example.com',
        },
      })
    );
  }),

  http.post(`${API_BASE_URL}/api/auth/reset-password`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Password reset email sent',
      })
    );
  }),

  http.post(`${API_BASE_URL}/api/auth/confirm-reset`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Password reset successful',
      })
    );
  }),
];
