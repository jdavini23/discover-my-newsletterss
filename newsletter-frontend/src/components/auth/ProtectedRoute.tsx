import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles 
}) => {
  const { isAuthenticated, user } = useAuthStore();

  const hasRequiredRoles = requiredRoles ? 
    user?.roles?.some(role => requiredRoles.includes(role)) : 
    true;

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !hasRequiredRoles) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Higher-order component for role-based access control
export const RoleProtectedRoute: React.FC<{
  allowedRoles: string[];
}> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  const hasRequiredRole = user?.roles
    ? allowedRoles.some((role) => user.roles?.includes(role))
    : false;

  if (!hasRequiredRole) {
    // Redirect to unauthorized page or show an error
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // If authenticated and has required role, render the child routes
  return <Outlet />;
};
