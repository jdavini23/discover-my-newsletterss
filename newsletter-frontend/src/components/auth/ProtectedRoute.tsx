import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to login page, saving the current location they were trying to access
    return <Navigate 
      to="/login" 
      state={{ from: location }} 
      replace 
    />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

// Higher-order component for role-based access control
export const RoleProtectedRoute: React.FC<{ 
  allowedRoles: string[] 
}> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate 
      to="/login" 
      state={{ from: location }} 
      replace 
    />;
  }

  // Check if user has the required role
  const hasRequiredRole = user?.roles 
    ? allowedRoles.some(role => user.roles?.includes(role))
    : false;

  if (!hasRequiredRole) {
    // Redirect to unauthorized page or show an error
    return <Navigate 
      to="/unauthorized" 
      state={{ from: location }} 
      replace 
    />;
  }

  // If authenticated and has required role, render the child routes
  return <Outlet />;
};
