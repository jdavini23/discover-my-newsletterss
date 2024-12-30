import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import NewsletterDiscoveryPage from './pages/NewsletterDiscoveryPage';

const App: React.FC = () => {
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    // Set up Firebase auth listener when app loads
    const unsubscribe = initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [initializeAuth]);

  return (
    <Router>
      <Toaster 
        position="top-right" 
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 }
        }} 
      />
      <Routes>
        <Route 
          path="/auth" 
          element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/newsletters" 
          element={isAuthenticated ? <NewsletterDiscoveryPage /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? (
            <div className="min-h-screen bg-gray-50 w-screen">
              <header className="bg-primary-600 text-white p-4 flex justify-between items-center w-full">
                <h1 className="text-2xl font-bold">Newsletter Dashboard</h1>
                <nav className="flex space-x-4">
                  <Link 
                    to="/newsletters" 
                    className="text-white hover:underline"
                  >
                    Discover
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-white hover:underline"
                  >
                    Profile
                  </Link>
                </nav>
              </header>
              <main className="w-full px-4 py-8">
                <p className="text-gray-700">Welcome to your Newsletter Dashboard</p>
              </main>
            </div>
          ) : (
            <Navigate to="/auth" replace />
          )} 
        />
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/" : "/auth"} replace />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
