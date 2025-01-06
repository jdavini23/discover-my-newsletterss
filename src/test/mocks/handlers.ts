import { http, HttpResponse } from 'msw';

// Define mock API handlers
export const handlers = [
  // Example login handler
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json();

    if (username === 'testuser' && password === 'password') {
      return HttpResponse.json(
        {
          user: {
            id: '1',
            username: 'testuser',
            email: 'test@example.com',
          },
          token: 'mock-jwt-token',
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      {
        message: 'Invalid credentials',
      },
      { status: 401 }
    );
  }),

  // Example newsletters fetch handler
  http.get('/api/newsletters', () => {
    return HttpResponse.json(
      [
        {
          id: '1',
          title: 'Tech Weekly',
          description: 'Latest tech news and trends',
        },
        {
          id: '2',
          title: 'Science Digest',
          description: 'Cutting-edge scientific discoveries',
        },
      ],
      { status: 200 }
    );
  }),
];

export {};
