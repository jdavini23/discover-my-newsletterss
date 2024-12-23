import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { NotificationCenter } from './components/common/Notification';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const NewsletterList = lazy(() => import('./pages/NewsletterList'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/login'));

// Loading Fallback Component
const LoadingFallback: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <NotificationCenter />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/newsletters"
                element={
                  <ProtectedRoute>
                    <NewsletterList />
                  </ProtectedRoute>
                }
              />

              {/* 404 Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;
