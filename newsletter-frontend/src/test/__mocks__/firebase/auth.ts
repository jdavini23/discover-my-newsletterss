import { vi } from 'vitest';
import { mockFirebaseAuth, mockUser } from '../../mocks/firebaseAuth';

export const getAuth = vi.fn().mockReturnValue(mockFirebaseAuth);
export const onAuthStateChanged = mockFirebaseAuth.onAuthStateChanged;
export const signInWithEmailAndPassword = mockFirebaseAuth.signInWithEmailAndPassword;
export const createUserWithEmailAndPassword = mockFirebaseAuth.createUserWithEmailAndPassword;
export const signOut = mockFirebaseAuth.signOut;
export const sendPasswordResetEmail = mockFirebaseAuth.sendPasswordResetEmail;

export { mockUser as User };
