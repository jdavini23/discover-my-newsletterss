import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../../../config/environment';

const mockUser = {
  id: 'user123',
  email: 'test@example.com',
  name: 'Test User',
  token: 'mock_auth_token'
};

export const authHandlers = [
  http.post(`${API_BASE_URL}/api/auth/login`, async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as { email: string, password: string };
    
    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json(mockUser);
    } else {
      return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  }),

  http.post(`${API_BASE_URL}/api/auth/register`, async ({ request }) => {
    const body = await request.json();
    const { email, password, name } = body as { email: string, password: string, name: string };
    
    if (email && password && name) {
      return HttpResponse.json({
        id: 'new_user_123',
        email,
        name,
        token: 'new_mock_auth_token'
      });
    } else {
      return HttpResponse.json({ error: 'Registration failed' }, { status: 400 });
    }
  }),

  http.post(`${API_BASE_URL}/api/auth/reset-password`, async ({ request }) => {
    const body = await request.json();
    const { email } = body as { email: string };
    
    if (email === 'test@example.com') {
      return HttpResponse.json({
        message: 'Password reset link sent',
        resetToken: 'mock_reset_token'
      });
    } else {
      return HttpResponse.json({ error: 'Email not found' }, { status: 404 });
    }
  }),

  http.post(`${API_BASE_URL}/api/auth/confirm-reset`, async ({ request }) => {
    const body = await request.json();
    const { token, newPassword } = body as { token: string, newPassword: string };
    
    if (token === 'mock_reset_token' && newPassword) {
      return HttpResponse.json({
        message: 'Password reset successful'
      });
    } else {
      return HttpResponse.json({ error: 'Invalid reset token' }, { status: 400 });
    }
  })
];
