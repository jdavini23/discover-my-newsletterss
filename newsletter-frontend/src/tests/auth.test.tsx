import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
    user: {
      uid: 'test-user-id',
      email: 'test@example.com',
      displayName: null,
      updateProfile: jest.fn(),
    },
  }),
  signInWithEmailAndPassword: jest.fn().mockResolvedValue({
    user: {
      uid: 'test-user-id',
      email: 'test@example.com',
      displayName: null,
    },
  }),
  signOut: jest.fn().mockResolvedValue(undefined),
  sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
  onAuthStateChanged: jest.fn(),
  updateProfile: jest.fn().mockResolvedValue(undefined),
  getAuth: jest.fn(() => ({})),
}));

jest.mock('firebase/firestore', () => {
  const setDoc = jest.fn().mockResolvedValue(undefined);
  return {
    collection: jest.fn(() => 'users-collection'),
    doc: jest.fn((collection, id) => `${collection}/${id}`),
    setDoc,
    getDoc: jest.fn(() => ({
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn(() => ({
        email: 'test@example.com',
        displayName: 'Original Name',
      })),
    })),
  };
});

// Mock entire react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate" data-to={to} />,
  Routes: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Route: ({ element }: { element: React.ReactNode }) => <>{element}</>,
}));

// Test component to exercise auth context
const TestAuthComponent: React.FC = () => {
  const { user, userData, signUp, logIn, logOut, resetPassword } = useAuth();

  return (
    <div>
      {!user ? (
        <>
          <button
            data-testid="signup-button"
            onClick={() => signUp('test@example.com', 'password123', { displayName: 'Test User' })}
          >
            Sign Up
          </button>
          <button
            data-testid="login-button"
            onClick={() => logIn('test@example.com', 'password123')}
          >
            Login
          </button>
          <button
            data-testid="reset-password-button"
            onClick={() => resetPassword('test@example.com')}
          >
            Reset Password
          </button>
        </>
      ) : (
        <>
          <div data-testid="user-email">{user.email}</div>
          <div data-testid="user-name">{userData?.displayName}</div>
          <button data-testid="logout-button" onClick={() => logOut()}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

describe('Authentication Context', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mocked implementations
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      // Simulate an initial state with no user
      callback(null);
      return () => {};
    });
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

    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockUser,
    });

    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      // Simulate user state after sign up
      callback(null);
      return () => {};
    });

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
    });
  });

  test('Login Flow', async () => {
    const mockUser = {
      uid: 'test-user-id',
      email: 'test@example.com',
    };

    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockUser,
    });

    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      // Simulate user state after login
      callback(null);
      return () => {};
    });

    const { getByTestId } = renderComponent();

    const loginButton = getByTestId('login-button');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
    });
  });

  test('Logout Flow', async () => {
    const mockUser = {
      uid: 'test-user-id',
      email: 'test@example.com',
    };

    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      // Simulate initial logged-in state
      callback(mockUser);
      return () => {};
    });

    (signOut as jest.Mock).mockResolvedValue(undefined);

    const { getByTestId } = renderComponent();

    // Wait for initial render with user
    await waitFor(() => {
      expect(getByTestId('user-email').textContent).toBe('test@example.com');
    });

    const logoutButton = getByTestId('logout-button');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });

  test('Password Reset Flow', async () => {
    (sendPasswordResetEmail as jest.Mock).mockResolvedValue(undefined);

    const { getByTestId } = renderComponent();

    const resetPasswordButton = getByTestId('reset-password-button');
    fireEvent.click(resetPasswordButton);

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), 'test@example.com');
    });
  });
});
