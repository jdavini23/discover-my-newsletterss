import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';
import { auth } from '../lib/firebase';
import { AuthProviderType, signInWithProvider } from '../lib/authProviders';

interface UserData {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signUp: (email: string, password: string, additionalInfo?: UserData) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (userData: UserData) => Promise<void>;
  signInWithOAuthProvider: (provider: AuthProviderType) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  const signUp = async (email: string, password: string, additionalInfo?: UserData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile if additional info provided
    if (additionalInfo?.displayName) {
      await updateProfile(userCredential.user, {
        displayName: additionalInfo.displayName
      });
    }

    // Store user data in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      ...additionalInfo,
      createdAt: new Date()
    });

    return userCredential;
  };

  const logIn = (email: string, password: string) => 
    signInWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth);

  const resetPassword = (email: string) => 
    sendPasswordResetEmail(auth, email);

  const updateUserProfile = async (userData: UserData) => {
    if (!user) throw new Error('No authenticated user');

    // Update Firebase Authentication profile
    await updateProfile(user, {
      displayName: userData.displayName || undefined,
      photoURL: userData.photoURL || undefined
    });

    // Update Firestore user document
    await setDoc(doc(db, 'users', user.uid), 
      { ...userData }, 
      { merge: true }
    );
  };

  const signInWithOAuthProvider = async (provider: AuthProviderType) => {
    return await signInWithProvider(provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch additional user data from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        setUserData({
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          ...userDoc.data()
        });
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userData,
    loading,
    signUp,
    logIn,
    logOut,
    resetPassword,
    updateUserProfile,
    signInWithOAuthProvider
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
