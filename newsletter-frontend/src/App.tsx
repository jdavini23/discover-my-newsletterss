import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { NotificationCenter } from './components/common/Notification';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const NewsletterList = lazy(() => import('./pages/NewsletterList'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading Fallback Component
const LoadingFallback: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <NotificationCenter />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/newsletters" element={<NewsletterList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
