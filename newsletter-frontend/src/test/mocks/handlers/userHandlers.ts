import { http, HttpResponse } from 'msw';

const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: 'https://example.com/avatar.png',
};

export const userHandlers = [
  http.get('http://localhost:3000/api/user', () => {
    return HttpResponse.json(mockUser);
  }),
];
