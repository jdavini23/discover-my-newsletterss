import React, { useState } from 'react';
import Head from '@/lib/next-head-mock';
import { useRouter } from '@/lib/next-router-mock';
import { useAuth } from '../contexts/AuthContext';

const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const router = useRouter();

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword(email);
      return { success: true, error: null };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      } else {
        return { success: false, error: 'An unexpected error occurred while resetting password' };
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Head>
        <title>Forgot Password | Newsletter Discovery</title>
      </Head>
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Reset Your Password</h2>

        <ResetPasswordForm>
          {({ email, error, success, setEmail, setError, setSuccess }) => (
            <>
              {error && (
                <div className="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="relative mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                  Password reset email sent. Check your inbox.
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                  required
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600"
              >
                Send Password Reset Email
              </button>

              {success && (
                <div className="mt-6 text-center">
                  <a href="/login" className="text-sm text-blue-600 hover:underline">
                    Back to Login
                  </a>
                </div>
              )}
            </>
          )}
        </ResetPasswordForm>
      </div>
    </div>
  );
};

const ResetPasswordForm = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleResetPassword(email);
    setError(result.error);
    setSuccess(result.success);

    if (result.success) {
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {children({ email, error, success, setEmail, setError, setSuccess })}
    </form>
  );
};

export default ForgotPasswordPage;
