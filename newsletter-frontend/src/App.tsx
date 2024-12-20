import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ProtectedRoute, RoleProtectedRoute } from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import NewsletterList from './pages/NewsletterList';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import { PasswordResetRequest } from './pages/PasswordResetRequest';
import { PasswordResetConfirm } from './pages/PasswordResetConfirm';

// New Imports
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { NotificationCenter } from './components/common/Notification';
import { Tooltip } from './components/common/Tooltip';
import { InterestWizard } from './components/discovery/InterestWizard';
import { NewsletterSearch } from './components/discovery/NewsletterSearch';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <NotificationCenter />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/forgot-password" element={<PasswordResetRequest />} />
          <Route path="/reset-password" element={<PasswordResetConfirm />} />

          {/* Discovery Routes */}
          <Route path="/discover/interests" element={<InterestWizard />} />
          <Route path="/discover/newsletters" element={<NewsletterSearch />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Role-based Protected Routes */}
            <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/newsletters" element={<NewsletterList />} />
            </Route>
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
