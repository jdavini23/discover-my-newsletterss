import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { auth } from '../lib/firebase';

interface AdminUserCreationProps {
  adminSecret: string;
}

export const AdminUserCreation: React.FC<AdminUserCreationProps> = ({ adminSecret }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAdminUserCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      // Verify admin secret (implement your own verification logic)
      if (adminSecret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
        throw new Error('Invalid admin secret');
      }

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional admin user info in Firestore
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'admin',
        createdAt: new Date(),
        isInitialAdmin: true,
      });

      // Set custom claims for admin (requires backend or Cloud Function)
      // This is a placeholder - actual implementation would be on the backend
      await user.getIdToken(true); // Force token refresh

      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Admin user creation error', error.message);
      } else {
        setError('An unexpected error occurred during admin user creation');
        console.error('Unexpected admin user creation error', error);
      }
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Create Initial Admin User</h2>
      {error && (
        <div className="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="relative mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
          Admin user created successfully!
        </div>
      )}
      <form onSubmit={handleAdminUserCreation}>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block font-bold text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block font-bold text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
            minLength={8}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600"
        >
          Create Admin User
        </button>
      </form>
    </div>
  );
};
