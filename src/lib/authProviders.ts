import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  User,
} from 'firebase/auth';

export type AuthProviderType = 'google' | 'github' | 'facebook';

const providerMap = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

export const signInWithProvider = async (providerName: AuthProviderType): Promise<User> => {
  const auth = getAuth();
  const provider = providerMap[providerName];

  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error(`Error signing in with ${providerName}:`, error);
    throw error;
  }
};
