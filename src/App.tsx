import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import AuthPage from './pages/AuthPage';
import NewsletterDiscoveryPage from './pages/NewsletterDiscoveryPage';
import NewsletterDetailPage from './pages/NewsletterDetailPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ReadingHistoryPage from './pages/ReadingHistoryPage';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  const authStore = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  const handleInitialize = useCallback(async () => {
    console.log('Starting initialization process');
    try {
      const isAuthenticated = await authStore.checkAuthStatus();
      console.log('Authentication check completed. Authenticated:', isAuthenticated);
      setIsInitialized(true);
    } catch (error) {
      console.error('Initialization failed:', error);
      setInitializationError(
        error instanceof Error ? error.message : 'An unknown error occurred during initialization'
      );
      setIsInitialized(true);
    }
  }, [authStore]);

  useEffect(() => {
    console.log('Mounting App component, triggering initialization');
    handleInitialize();
  }, [handleInitialize]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4 mx-auto"></div>
          <p className="text-gray-700">Initializing...</p>
        </div>
      </div>
    );
  }

  if (initializationError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Initialization Error</h2>
          <p className="text-red-500 mb-4">{initializationError}</p>
          <button
            onClick={handleInitialize}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry Initialization
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <Toaster position="top-right" />
        <Layout>
          <Routes>
            <Route
              path="/auth"
              element={
                !authStore.isAuthenticated ? (
                  <AuthPage />
                ) : (
                  <Navigate to="/newsletters" replace={true} />
                )
              }
            />
            <Route
              path="/newsletters"
              element={
                authStore.isAuthenticated ? (
                  <NewsletterDiscoveryPage />
                ) : (
                  <Navigate to="/auth" replace={true} />
                )
              }
            />
            <Route
              path="/newsletters/:newsletterId"
              element={
                authStore.isAuthenticated ? (
                  <NewsletterDetailPage />
                ) : (
                  <Navigate to="/auth" replace={true} />
                )
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/reading-history"
              element={
                <ProtectedRoute>
                  <ReadingHistoryPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
