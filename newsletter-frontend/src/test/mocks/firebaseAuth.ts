import { vi } from 'vitest';
import { User } from 'firebase/auth';

export const mockUser: User = {
  uid: 'test-user-id',
  email: 'test@example.com',
  emailVerified: true,
  displayName: 'Test User',
  providerData: [],
  getIdToken: vi.fn().mockResolvedValue('mock-token'),
  reload: vi.fn(),
  toJSON: vi.fn(),
} as unknown as User;

export const mockFirebaseAuth = {
  currentUser: mockUser,
  onAuthStateChanged: vi.fn((callback) => {
    callback(mockUser);
    return () => {};
  }),
  signInWithEmailAndPassword: vi.fn().mockResolvedValue({ user: mockUser }),
  createUserWithEmailAndPassword: vi.fn().mockResolvedValue({ user: mockUser }),
  signOut: vi.fn().mockResolvedValue(undefined),
  sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
};
