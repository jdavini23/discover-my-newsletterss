import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { expect, describe, test, vi } from 'vitest';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

// Mock entire Firebase modules
vi.mock('firebase/auth', () => ({
  updateProfile: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

vi.mock('firebase/firestore', () => {
  const setDoc = vi.fn();
  return {
    collection: vi.fn(() => 'users-collection'),
    doc: vi.fn((collection, id) => `${collection}/${id}`),
    setDoc,
    getDoc: vi.fn(() => ({
      exists: () => true,
      data: () => ({
        email: 'test@example.com',
        displayName: 'Original Name',
      }),
    })),
  };
});

// Test component to exercise user management
function UserManagementTestComponent() {
  const { user, userData, updateUserProfile } = useAuth();

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
                photoURL: 'https://example.com/avatar.jpg',
              })
            }
          >
            Update Profile
          </button>
        </>
      )}
    </div>
  );
}

describe('User Management Features', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mocked implementations
    (onAuthStateChanged as vi.Mock).mockImplementation((_auth, callback) => {
      // Simulate an initial state with a user
      callback({
        uid: 'test-user-id',
        email: 'test@example.com',
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
    (updateProfile as vi.Mock).mockResolvedValue(undefined);

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
