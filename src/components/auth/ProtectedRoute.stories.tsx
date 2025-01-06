import React from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const DummyComponent = () => <div>Protected Content</div>;

export const AuthenticatedRoute = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DummyComponent />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export const UnauthorizedRoute = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute requireAdmin={true}>
            <DummyComponent />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

AuthenticatedRoute.ladle = {
  name: 'Authenticated Protected Route',
  description: 'Protected route for authenticated users',
};

UnauthorizedRoute.ladle = {
  name: 'Admin-Only Protected Route',
  description: 'Protected route requiring admin privileges',
};
