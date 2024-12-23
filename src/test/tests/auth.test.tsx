import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

// Mock entire Firebase modules
vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn().mockResolvedValue({
    user: {
      uid: 'test-user-id',
      email: 'test@example.com',
      displayName: null,
      updateProfile: vi.fn(),
    },
  }),
  signInWithEmailAndPassword: vi.fn().mockResolvedValue({
    user: {
      uid: 'test-user-id',
      email: 'test@example.com',
    },
  }),
  signOut: vi.fn().mockResolvedValue(undefined),
  sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback({
      uid: 'test-user-id',
      email: 'test@example.com',
    });
    return () => {};
  }),
}));

vi.mock('firebase/firestore', () => ({
  setDoc: vi.fn().mockResolvedValue(undefined),
}));

// Mock react-router hooks
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate" data-to={to} />,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ element }: { element: React.ReactNode }) => <div>{element}</div>,
}));

// Test component to exercise auth context
const TestAuthComponent = () => {
  const {
    currentUser,
    signUp,
    signIn,
    logout,
    resetPassword,
  } = useAuth();

  return (
    <div>
      <div data-testid="user-email">{currentUser?.email}</div>
      <button
        data-testid="signup-button"
        onClick={() => signUp('test@example.com', 'password123')}
      >
        Sign Up
      </button>
      <button
        data-testid="signin-button"
        onClick={() => signIn('test@example.com', 'password123')}
      >
        Sign In
      </button>
      <button data-testid="logout-button" onClick={logout}>
        Logout
      </button>
      <button
        data-testid="reset-password-button"
        onClick={() => resetPassword('test@example.com')}
      >
        Reset Password
      </button>
    </div>
  );
};

describe('Authentication Context', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mocked implementations
  });

  const renderComponent = () => {
    return render(
      <AuthProvider>
        <TestAuthComponent />
      </AuthProvider>
    );
  };

  test('Sign Up Flow', async () => {
    const mockUser = {
      uid: 'test-user-id',
      email: 'test@example.com',
    };

    const { getByTestId } = renderComponent();

    const signUpButton = getByTestId('signup-button');
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(setDoc).toHaveBeenCalled();
      expect(getByTestId('user-email').textContent).toBe(mockUser.email);
    });
  });

  test('Sign In Flow', async () => {
    const { getByTestId } = renderComponent();

    const signInButton = getByTestId('signin-button');
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(getByTestId('user-email').textContent).toBe('test@example.com');
    });
  });

  test('Logout Flow', async () => {
    const { getByTestId } = renderComponent();

    const logoutButton = getByTestId('logout-button');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(getByTestId('user-email').textContent).toBe('');
    });
  });

  test('Reset Password Flow', async () => {
    const { getByTestId } = renderComponent();

    const resetPasswordButton = getByTestId('reset-password-button');
    fireEvent.click(resetPasswordButton);

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com'
      );
    });
  });
});
