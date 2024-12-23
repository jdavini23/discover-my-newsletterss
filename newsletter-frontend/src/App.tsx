import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

// Import components and stores
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { NotificationCenter } from './components/common/Notification';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useAuthStore } from './stores/authStore';

// Create a client following best practices for caching and retry
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Lazy load page components for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const NewsletterList = lazy(() => import('./pages/NewsletterList'));
const NotFound = lazy(() => import('./pages/NotFound'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const PasswordResetRequest = lazy(() => import('./pages/PasswordResetRequest'));
const PasswordResetConfirm = lazy(() => import('./pages/PasswordResetConfirm'));
const InterestWizard = lazy(() => import('./pages/InterestWizard'));
const NewsletterSearch = lazy(() => import('./pages/NewsletterSearch'));

// Loading Fallback Component for improved UX
const LoadingFallback: React.FC = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-blue-500"></div>
  </div>
);

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            <div className="min-h-screen bg-gray-50">
              <Toaster position="top-right" />
              <NotificationCenter />
              <Router>
                <Routes>
                  {/* Public Routes */}
                  <Route
                    path="/"
                    element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Home />}
                  />
                  <Route
                    path="/login"
                    element={isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginPage />}
                  />
                  <Route
                    path="/register"
                    element={isAuthenticated() ? <Navigate to="/dashboard" /> : <RegisterPage />}
                  />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="/password-reset" element={<PasswordResetRequest />} />
                  <Route path="/password-reset-confirm" element={<PasswordResetConfirm />} />
                  <Route path="/discover/interests" element={<InterestWizard />} />
                  <Route path="/discover/newsletters" element={<NewsletterSearch />} />

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

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </div>
          </Suspense>
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
