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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Create Initial Admin User</title>
      </Head>
      <div className="w-full max-w-md">
        {!showAdminCreation ? (
          <form 
            onSubmit={handleSecretSubmit} 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2" 
                htmlFor="adminSecret"
              >
                Admin Secret
              </label>
              <input
                type="password"
                id="adminSecret"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
