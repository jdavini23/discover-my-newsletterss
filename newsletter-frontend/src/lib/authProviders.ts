import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, Auth, AuthProvider } from 'firebase/auth';

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export type AuthProviderType = 'google' | 'github';

export const signInWithProvider = async (auth: Auth, providerType: AuthProviderType) => {
  const provider = providerType === 'google' ? googleProvider : githubProvider;
  return signInWithPopup(auth, provider);
};
