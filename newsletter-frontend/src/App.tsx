import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ProtectedRoute, RoleProtectedRoute } from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import NewsletterList from './pages/NewsletterList';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

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
    </Router>
  );
};

export default App;
