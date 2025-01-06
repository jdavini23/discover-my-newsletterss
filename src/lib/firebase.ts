import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration with environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate configuration before initialization
function validateFirebaseConfig() {
  const requiredKeys: (keyof typeof firebaseConfig)[] = [
    'apiKey', 
    'authDomain', 
    'projectId', 
    'storageBucket', 
    'messagingSenderId', 
    'appId'
  ];

  const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

  if (missingKeys.length > 0) {
    console.error(
      'Missing Firebase configuration keys: ' + 
      missingKeys.join(', ') + 
      '. Please check your .env file and .env.example.'
    );
    throw new Error('Incomplete Firebase configuration');
  }
}

// Validate configuration
validateFirebaseConfig();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
