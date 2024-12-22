import { 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  FacebookAuthProvider,
  signInWithPopup,
  AuthProvider
} from 'firebase/auth';
import { auth } from './firebase';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const db = getFirestore();

export enum AuthProviderType {
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook'
}

const providerMap: Record<AuthProviderType, () => AuthProvider> = {
  [AuthProviderType.GOOGLE]: () => new GoogleAuthProvider(),
  [AuthProviderType.GITHUB]: () => new GithubAuthProvider(),
  [AuthProviderType.FACEBOOK]: () => new FacebookAuthProvider()
};

export const signInWithProvider = async (providerType: AuthProviderType) => {
  try {
    const provider = providerMap[providerType]();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Store user info in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerId: user.providerId,
      createdAt: new Date()
    }, { merge: true });

    return user;
  } catch (error) {
    console.error(`${providerType} sign in error`, error);
    throw error;
  }
};

// Additional provider-specific configurations
export const configureProviderScopes = () => {
  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('profile');
  googleProvider.addScope('email');

  const githubProvider = new GithubAuthProvider();
  githubProvider.addScope('user:email');
};
