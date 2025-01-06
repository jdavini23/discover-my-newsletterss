import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

// Mock entire Firebase modules
vi.mock('firebase/auth', () => ({
  updateProfile: vi.fn().mockResolvedValue(undefined),
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback({
      uid: 'test-user-id',
      email: 'test@example.com',
      displayName: 'Original Name',
    });
    return () => {};
  }),
}));

vi.mock('firebase/firestore', () => ({
  setDoc: vi.fn().mockResolvedValue(undefined),
  collection: vi.fn(() => 'users-collection'),
  doc: vi.fn((collection, id) => `${collection}/${id}`),
  getDoc: vi.fn(() => ({
    exists: vi.fn().mockReturnValue(true),
    data: vi.fn(() => ({
      email: 'test@example.com',
      displayName: 'Original Name',
    })),
  })),
}));

// Mock react-router hooks
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

// Test component to exercise user management
const UserManagementTestComponent = () => {
  const { currentUser, userData, updateUserProfile } = useAuth();

  return (
    <div>
      {currentUser && (
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
};

describe('User Management Features', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mocked implementations
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

    const updateProfileButton = screen.getByTestId('update-profile-button');
    fireEvent.click(updateProfileButton);

    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith(expect.anything(), {
        displayName: 'Updated Name',
        photoURL: 'https://example.com/avatar.jpg',
      });
      expect(setDoc).toHaveBeenCalled();
      expect(screen.getByTestId('current-name').textContent).toBe('Updated Name');
    });
  });
});