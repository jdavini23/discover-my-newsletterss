import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authService } from '../authService';
import { server } from '@/test/mocks/server';
import Cookies from 'js-cookie';

// Mock Cookies to prevent actual cookie manipulation
vi.mock('js-cookie', () => ({
  default: {
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    // Reset handlers and mocks before each test
    server.resetHandlers();
    vi.clearAllMocks();
  });

  it('should login successfully', async () => {
    const loginResult = await authService.login({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(loginResult.user.email).toBe('test@example.com');
    expect(loginResult.token).toBeTruthy();
    expect(Cookies.set).toHaveBeenCalled();
  });

  it('should handle login failure', async () => {
    await expect(
      authService.login({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      })
    ).rejects.toThrow();
  });

  it('should register successfully', async () => {
    const registerResult = await authService.register({
      email: 'newuser@example.com',
      password: 'newpassword123',
      name: 'New User',
    });

    expect(registerResult.user.email).toBe('newuser@example.com');
    expect(registerResult.token).toBeTruthy();
    expect(Cookies.set).toHaveBeenCalled();
  });

  it('should handle registration failure', async () => {
    await expect(
      authService.register({
        email: 'existing@example.com',
        password: 'password123',
        name: 'Existing User',
      })
    ).rejects.toThrow();
  });

  it('should validate login input', async () => {
    await expect(
      authService.login({
        email: 'invalid-email',
        password: '123', // Too short
      })
    ).rejects.toThrow();
  });

  it('should validate registration input', async () => {
    await expect(
      authService.register({
        email: 'invalid-email',
        password: '123',
        name: 'A', // Too short
      })
    ).rejects.toThrow();
  });

  it('should logout and remove token', () => {
    authService.logout();
    expect(Cookies.remove).toHaveBeenCalledWith('auth_token');
  });

  it('should get current user when token is valid', () => {
    // Mock a valid token
    (Cookies.get as unknown).mockReturnValue('mock.valid.token');

    // Mock token decoding
    const originalDecodeToken = Object.getPrototypeOf(authService).decodeToken;
    Object.getPrototypeOf(authService).decodeToken = () => ({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
    });

    const user = authService.getCurrentUser();

    expect(user).toBeTruthy();
    expect(user?.email).toBe('test@example.com');

    // Restore original method
    Object.getPrototypeOf(authService).decodeToken = originalDecodeToken;
  });

  it('should return null when no token exists', () => {
    (Cookies.get as unknown).mockReturnValue(undefined);

    const user = authService.getCurrentUser();

    expect(user).toBeNull();
  });
});
