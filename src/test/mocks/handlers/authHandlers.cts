import { rest, RestRequest, RestResponse, RestContext } from 'msw';

export const authHandlers = [
  // Login handler
  rest.post('/api/auth/login', async (req: RestRequest, res: RestResponse, ctx: RestContext) => {
    const { email, password } = await req.json();

    // Simulate different login scenarios
    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.json({
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            role: 'user',
          },
          token: 'mock_access_token_123',
        })
      );
    }

    if (email === 'admin@example.com' && password === 'admin123') {
      return res(
        ctx.json({
          user: {
            id: '2',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin',
          },
          token: 'mock_admin_token_456',
        })
      );
    }

    // Simulate login failure
    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
  }),

  // Registration handler
  rest.post('/api/auth/register', async (req: RestRequest, res: RestResponse, ctx: RestContext) => {
    const { email, password, name } = await req.json();

    // Simulate registration scenarios
    if (!email || !password || !name) {
      return res(ctx.status(400), ctx.json({ message: 'Missing required fields' }));
    }

    if (email === 'existing@example.com') {
      return res(ctx.status(409), ctx.json({ message: 'Email already exists' }));
    }

    return res(
      ctx.json({
        user: {
          id: 'new_user_123',
          email,
          name,
          role: 'user',
        },
        token: 'mock_new_user_token',
      })
    );
  }),

  // Password reset handler
  rest.post(
    '/api/auth/reset-password',
    async (req: RestRequest, res: RestResponse, ctx: RestContext) => {
      const { email } = await req.json();

      // Simulate password reset scenarios
      if (!email) {
        return res(ctx.status(400), ctx.json({ message: 'Email is required' }));
      }

      if (email === 'nonexistent@example.com') {
        return res(ctx.status(404), ctx.json({ message: 'Email not found' }));
      }

      return res(
        ctx.json({
          message: 'Password reset link sent',
          resetToken: 'mock_reset_token_789',
        })
      );
    }
  ),
];
