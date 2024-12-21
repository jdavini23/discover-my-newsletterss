import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useAuthStore } from './stores/authStore';
import { NotificationCenter } from './components/common/Notification';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PasswordResetRequest = lazy(() => import('./pages/PasswordResetRequest'));
const PasswordResetConfirm = lazy(() => import('./pages/PasswordResetConfirm'));
const NewsletterSearch = lazy(() => import('./pages/NewsletterSearch'));
const Profile = lazy(() => import('./pages/Profile'));
const NewsletterList = lazy(() => import('./pages/NewsletterList'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const InterestWizard = lazy(() => import('./components/discovery/InterestWizard'));

// Loading Fallback Component
const LoadingFallback: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
  </div>
);

// Role-based Protected Route Component
const RoleProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => (
  <ProtectedRoute requiredRoles={allowedRoles}>
    {children}
  </ProtectedRoute>
);

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <div className="min-h-screen bg-gray-50">
              <Toaster position="top-right" />
              <NotificationCenter />
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
                <Route
                  path="/password-reset-confirm"
                  element={<PasswordResetConfirm />}
                />
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

                {/* Role-based Protected Routes */}
                <Route
                  path="/newsletters"
                  element={
                    <RoleProtectedRoute allowedRoles={['admin']}>
                      <NewsletterList />
                    </RoleProtectedRoute>
                  }
                />

                {/* 404 Not Found Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Suspense>
        </ErrorBoundary>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
