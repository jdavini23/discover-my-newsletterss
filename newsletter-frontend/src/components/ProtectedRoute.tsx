import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectPath = '/auth' }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
