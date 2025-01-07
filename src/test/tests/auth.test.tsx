import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
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
  const { currentUser, signUp, signIn, logout, resetPassword } = useAuth();

  return (
    <div>
      <div data-testid="user-email">{currentUser?.email}</div>
      <button data-testid="signup-button" onClick={() => signUp('test@example.com', 'password123')}>
        Sign Up
      </button>
      <button data-testid="signin-button" onClick={() => signIn('test@example.com', 'password123')}>
        Sign In
      </button>
      <button data-testid="logout-button" onClick={logout}>
        Logout
      </button>
      <button data-testid="reset-password-button" onClick={() => resetPassword('test@example.com')}>
        Reset Password
      </button>
      <div data-testid="signup-success" />
      <div data-testid="signup-error" />
      <div data-testid="signin-success" />
      <div data-testid="signin-error" />
      <div data-testid="reset-password-success" />
      <div data-testid="signout-success" />
    </div>
  );
};

describe('Authentication Context', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <AuthProvider>
        <TestAuthComponent />
      </AuthProvider>
    );
  };

  test('Successful User Sign Up', async () => {
    renderComponent();

    const signUpButton = screen.getByTestId('signup-button');
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(setDoc).toHaveBeenCalled();
      const successMessage = screen.getByTestId('signup-success');
      expect(successMessage.textContent).toContain('Sign up successful');
    });
  });

  test('Sign Up with Existing Email', async () => {
    vi.mocked(createUserWithEmailAndPassword).mockRejectedValueOnce(
      new Error('Email already in use')
    );

    renderComponent();

    const signUpButton = screen.getByTestId('signup-button');
    fireEvent.click(signUpButton);

    await waitFor(() => {
      const errorMessage = screen.getByTestId('signup-error');
      expect(errorMessage.textContent).toContain('Email already in use');
    });
  });

  test('Successful User Sign In', async () => {
    renderComponent();

    const signInButton = screen.getByTestId('signin-button');
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      const successMessage = screen.getByTestId('signin-success');
      expect(successMessage.textContent).toContain('Sign in successful');
    });
  });

  test('Sign In with Invalid Credentials', async () => {
    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(
      new Error('Invalid credentials')
    );

    renderComponent();

    const signInButton = screen.getByTestId('signin-button');
    fireEvent.click(signInButton);

    await waitFor(() => {
      const errorMessage = screen.getByTestId('signin-error');
      expect(errorMessage.textContent).toContain('Invalid credentials');
    });
  });

  test('Password Reset Flow', async () => {
    renderComponent();

    const resetButton = screen.getByTestId('reset-password-button');
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com'
      );
      const successMessage = screen.getByTestId('reset-password-success');
      expect(successMessage.textContent).toContain('Password reset email sent');
    });
  });

  test('User Sign Out', async () => {
    renderComponent();

    const signOutButton = screen.getByTestId('logout-button');
    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      const signedOutMessage = screen.getByTestId('signout-success');
      expect(signedOutMessage.textContent).toContain('Signed out successfully');
    });
  });
});
