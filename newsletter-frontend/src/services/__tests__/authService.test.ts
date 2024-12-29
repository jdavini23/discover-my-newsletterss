import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../authService';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  getAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn(),
  })),
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();
    authService = new AuthService();
  });

  it('should login successfully', async () => {
    const mockUser = {
      email: 'test@example.com',
      uid: '123',
      getIdToken: vi.fn().mockResolvedValue('test-token'),
    };

    (signInWithEmailAndPassword as any).mockResolvedValue({
      user: mockUser,
    });

    const result = await authService.login('test@example.com', 'password');

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');
    expect(result.user).toEqual(mockUser);
    expect(result.token).toBe('test-token');
  });

  it('should handle login failure', async () => {
    const error = new Error('Invalid credentials');
    (signInWithEmailAndPassword as any).mockRejectedValue(error);

    await expect(authService.login('test@example.com', 'wrong-password'))
      .rejects.toThrow('Invalid credentials');
  });

  it('should register successfully', async () => {
    const mockUser = {
      email: 'test@example.com',
      uid: '123',
      getIdToken: vi.fn().mockResolvedValue('test-token'),
    };

    (createUserWithEmailAndPassword as any).mockResolvedValue({
      user: mockUser,
    });

    const result = await authService.register('test@example.com', 'password');

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');
    expect(result.user).toEqual(mockUser);
    expect(result.token).toBe('test-token');
  });

  it('should handle registration failure', async () => {
    const error = new Error('Email already in use');
    (createUserWithEmailAndPassword as any).mockRejectedValue(error);

    await expect(authService.register('existing@example.com', 'password'))
      .rejects.toThrow('Email already in use');
  });

  it('should validate login input', () => {
    expect(() => authService.login('', 'password'))
      .rejects.toThrow('Email and password are required');
    expect(() => authService.login('test@example.com', ''))
      .rejects.toThrow('Email and password are required');
  });

  it('should validate registration input', () => {
    expect(() => authService.register('', 'password'))
      .rejects.toThrow('Email and password are required');
    expect(() => authService.register('test@example.com', ''))
      .rejects.toThrow('Email and password are required');
  });

  it('should logout successfully', async () => {
    await authService.logout();
    expect(signOut).toHaveBeenCalledWith(auth);
  });

  it('should get current user when token is valid', () => {
    const mockUser = {
      email: 'test@example.com',
      uid: '123',
    };

    (auth as any).currentUser = mockUser;

    const user = authService.getCurrentUser();
    expect(user).toEqual(mockUser);
  });

  it('should return null when no token exists', () => {
    (auth as any).currentUser = null;
    const user = authService.getCurrentUser();
    expect(user).toBeNull();
  });
});
