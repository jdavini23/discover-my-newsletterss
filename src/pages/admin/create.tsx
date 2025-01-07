import React, { useState } from 'react';
import { AdminUserCreation } from '../../components/AdminUserCreation';
import Head from 'next/head';

const CreateAdminPage: React.FC = () => {
  const [adminSecret, setAdminSecret] = useState('');
  const [showAdminCreation, setShowAdminCreation] = useState(false);

  const handleSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Compare with environment variable
    if (adminSecret === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setShowAdminCreation(true);
    } else {
      alert('Invalid admin secret');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Head>
        <title>Create Initial Admin User</title>
      </Head>
      <div className="w-full max-w-md">
        {!showAdminCreation ? (
          <form
            onSubmit={handleSecretSubmit}
            className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
          >
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="adminSecret">
                Admin Secret
              </label>
              <input
                type="password"
                id="adminSecret"
                value={adminSecret}
                onChange={e => setAdminSecret(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Verify Secret
            </button>
          </form>
        ) : (
          <AdminUserCreation adminSecret={adminSecret} />
        )}
      </div>
    </div>
  );
};

export default CreateAdminPage;
