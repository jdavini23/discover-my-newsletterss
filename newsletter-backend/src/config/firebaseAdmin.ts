import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin/lib/credential';

// Ensure the app is only initialized once
if (!admin.apps.length) {
  const serviceAccountConfig: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountConfig),
    // Optional: Add other configuration like database URL if needed
  });
}

export const firebaseAdmin = admin;

// Utility functions for admin operations
export const verifyIdToken = async (token: string) => {
  try {
    return await firebaseAdmin.auth().verifyIdToken(token);
  } catch (error) {
    console.error('Error verifying token', error);
    throw error;
  }
};

export const createAdminUser = async (email: string, password: string) => {
  try {
    const user = await firebaseAdmin.auth().createUser({
      email,
      password,
      emailVerified: false,
    });

    // Optional: Set custom claims for admin
    await firebaseAdmin.auth().setCustomUserClaims(user.uid, { admin: true });

    return user;
  } catch (error) {
    console.error('Error creating admin user', error);
    throw error;
  }
};
