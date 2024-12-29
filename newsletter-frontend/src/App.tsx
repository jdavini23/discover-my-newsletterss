import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import components and stores
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { NotificationCenter } from './components/common/Notification';
import { AppErrorBoundary } from './components/common/AppErrorBoundary';
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

// Loading Fallback Component for improved UX
const LoadingFallback: React.FC = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-blue-500"></div>
  </div>
);

// Lazy load page components with error handling
const withErrorBoundary = (Component: React.ComponentType) => (props: any) => (
  <AppErrorBoundary>
    <Component {...props} />
  </AppErrorBoundary>
);

const Home = withErrorBoundary(lazy(() => import('./pages/Home')));
const Dashboard = withErrorBoundary(lazy(() => import('./pages/Dashboard')));
const Profile = withErrorBoundary(lazy(() => import('./pages/Profile')));
const NewsletterList = withErrorBoundary(lazy(() => import('./pages/NewsletterList')));
const NotFound = withErrorBoundary(lazy(() => import('./pages/NotFound')));
const Login = withErrorBoundary(lazy(() => import('./pages/LoginPage')));
const Register = withErrorBoundary(lazy(() => import('./pages/RegisterPage')));
const Unauthorized = withErrorBoundary(lazy(() => import('./pages/Unauthorized')));
const PasswordResetRequest = withErrorBoundary(lazy(() => import('./pages/PasswordResetRequest')));
const PasswordResetConfirm = withErrorBoundary(lazy(() => import('./pages/PasswordResetConfirm')));
const InterestWizard = withErrorBoundary(lazy(() => import('./pages/InterestWizard')));
const NewsletterSearch = withErrorBoundary(lazy(() => import('./pages/NewsletterSearch')));

const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingFallback />}>
          <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <NotificationCenter />
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
              />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
              />
              <Route
                path="/register"
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
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
              <Route
                path="/newsletters"
                element={
                  <ProtectedRoute>
                    <NewsletterList />
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
};

export default App;
