import { http, HttpResponse } from 'msw';

const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  displayName: 'Test User',
};

export const userHandlers = [
  http.post('http://localhost:3000/api/auth/login', async () => {
    return HttpResponse.json({
      user: mockUser,
      token: 'mock-token',
    });
  }),

  http.post('http://localhost:3000/api/auth/register', async () => {
    return HttpResponse.json({
      user: mockUser,
      token: 'mock-token',
    });
  }),

  http.post('http://localhost:3000/api/auth/logout', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.post('http://localhost:3000/api/auth/reset-password', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.get('http://localhost:3000/api/auth/me', () => {
    return HttpResponse.json(mockUser);
  }),
];
