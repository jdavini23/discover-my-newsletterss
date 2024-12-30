export enum AuthProviderType {
  EMAIL = 'email',
  GOOGLE = 'google',
  GITHUB = 'github'
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
}
