// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  AuthError,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
  FirestoreError,
} from 'firebase/firestore';

// Validate environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingVars.length > 0) {
  console.error('FIREBASE CONFIGURATION ERROR: Missing environment variables:', missingVars);
  throw new Error(`Missing Firebase configuration variables: ${missingVars.join(', ')}`);
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log('Firebase Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication helper functions
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Sign Up Error:', authError.message);
    throw new Error(authError.message);
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Sign In Error:', authError.message);
    throw new Error(authError.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Authentication state listener
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Utility function to fetch newsletters
export const fetchNewsletters = async () => {
  try {
    console.log('Fetching newsletters from Firestore...');

    const newslettersRef = collection(db, 'newsletters');
    const q = query(newslettersRef, limit(50));

    console.log('Newsletters Collection Reference:', newslettersRef.path);

    const querySnapshot = await getDocs(q);

    console.log('Query Snapshot:', {
      empty: querySnapshot.empty,
      size: querySnapshot.size,
      docs: querySnapshot.docs.map(doc => doc.id),
    });

    const newsletters = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Newsletter Document:', {
        id: doc.id,
        data: Object.keys(data),
      });
      return {
        id: doc.id,
        ...data,
      };
    });

    console.log(`Fetched ${newsletters.length} newsletters`);
    return newsletters;
  } catch (error) {
    console.error('DETAILED Error fetching newsletters:', error);

    // More detailed error logging
    if (error instanceof FirestoreError) {
      console.error('Firestore Error Details:', {
        code: error.code,
        message: error.message,
        stack: error.stack,
      });
    }

    throw error;
  }
};

export default app;
