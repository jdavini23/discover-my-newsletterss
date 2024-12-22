import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';

// Mock entire Firebase modules
jest.mock('firebase/auth', () => ({
  updateProfile: jest.fn().mockResolvedValue(undefined),
  onAuthStateChanged: jest.fn(),
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
        displayName: 'Original Name'
      }))
    }))
  };
});

// Test component to exercise user management
const UserManagementTestComponent: React.FC = () => {
  const { 
    user, 
    userData, 
    updateUserProfile 
  } = useAuth();

  return (
    <div>
      {user && (
        <>
          <div data-testid="current-name">{userData?.displayName}</div>
          <button 
            data-testid="update-profile-button"
            onClick={() => 
              updateUserProfile({ 
                displayName: 'Updated Name',
                photoURL: 'https://example.com/avatar.jpg'
              })
            }
          >
            Update Profile
          </button>
        </>
      )}
    </div>
  );
};

describe('User Management Features', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mocked implementations
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      // Simulate an initial state with a user
      callback({
        uid: 'test-user-id',
        email: 'test@example.com'
      });
      return () => {};
    });
  });

  const renderComponent = () => {
    return render(
      <AuthProvider>
        <UserManagementTestComponent />
      </AuthProvider>
    );
  };

  test('Update User Profile', async () => {
    renderComponent();

    // Initial name check
    await waitFor(() => {
      expect(screen.getByTestId('current-name').textContent).toBe('Original Name');
    });

    // Update profile
    await act(async () => {
      const updateButton = screen.getByTestId('update-profile-button');
      fireEvent.click(updateButton);
    });

    await waitFor(() => {
      // Verify updateProfile was called with correct parameters
      expect(updateProfile).toHaveBeenCalledWith(expect.anything(), {
        displayName: 'Updated Name',
        photoURL: 'https://example.com/avatar.jpg',
      });

      // Verify Firestore document update
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        {
          displayName: 'Updated Name',
          photoURL: 'https://example.com/avatar.jpg',
        },
        { merge: true }
      );
    });
  });
});
