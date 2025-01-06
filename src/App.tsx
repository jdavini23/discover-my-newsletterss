import React, { useEffect, useState } from 'react';
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
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await initializeAuth();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize authentication:', error);
        setIsInitialized(false);
      }
    };

    initAuth();
  }, []);

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

  return (
    <ErrorBoundary>
      <Router>
        <Toaster position="top-right">{/* Explicit children prop */}</Toaster>
        <Layout>
          <Routes>
            <Route
              path="/auth"
              element={
                !isAuthenticated ? <AuthPage /> : <Navigate to="/newsletters" replace={true} />
              }
            />
            <Route
              path="/newsletters"
              element={
                isAuthenticated ? (
                  <NewsletterDiscoveryPage />
                ) : (
                  <Navigate to="/auth" replace={true} />
                )
              }
            />
            <Route
              path="/newsletters/:newsletterId"
              element={
                isAuthenticated ? <NewsletterDetailPage /> : <Navigate to="/auth" replace={true} />
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
