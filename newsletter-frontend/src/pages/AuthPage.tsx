import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

type AuthMode = 'login' | 'register';

const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-medium">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {authMode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        
        {authMode === 'login' ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}

        <div className="text-center">
          <button 
            onClick={toggleAuthMode} 
            className="text-primary-600 hover:text-primary-500 transition-fast"
          >
            {authMode === 'login' 
              ? 'Need an account? Register' 
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
