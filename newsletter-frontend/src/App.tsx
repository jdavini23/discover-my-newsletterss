import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useAuthStore } from './stores/authStore';

// Import components with default exports
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import { PasswordResetRequest } from './pages/PasswordResetRequest';
import { PasswordResetConfirm } from './pages/PasswordResetConfirm';
import NewsletterSearch from './pages/NewsletterSearch';
import Profile from './pages/Profile';
import NewsletterList from './pages/NewsletterList';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import { InterestWizard } from './components/discovery/InterestWizard';
import { NotificationCenter } from './components/common/Notification';

// Role-based Protected Route
const RoleProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRoles: string[] 
}> = ({ children, allowedRoles }) => {
  return (
    <ProtectedRoute requiredRoles={allowedRoles}>
      {children}
    </ProtectedRoute>
  );
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <NotificationCenter />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <RegisterPage />} />
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
    </ErrorBoundary>
  );
};

export default App;
