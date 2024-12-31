import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import NewsletterDiscoveryPage from './pages/NewsletterDiscoveryPage';
import HomePage from './pages/HomePage';
import Navigation from './components/layout/Navigation';

const App: React.FC = () => {
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    // Set up Firebase auth listener when app loads
    const unsubscribe = initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [initializeAuth]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-16">
          {' '}
          {/* Add padding to account for fixed navigation */}
          <Toaster
            position="top-right"
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
            }}
          />
          <Routes>
            {/* Authentication Routes */}
            <Route
              path="/auth"
              element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" replace />}
            />

            {/* Authenticated User Routes */}
            <Route
              path="/profile"
              element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/newsletters"
              element={
                isAuthenticated ? <NewsletterDiscoveryPage /> : <Navigate to="/auth" replace />
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <div className="min-h-screen bg-gray-50 w-full">
                    <div className="container mx-auto px-4 py-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Quick Stats */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                          <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Newsletter Insights
                          </h2>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Subscribed Newsletters</span>
                              <span className="font-bold text-primary-600">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Unread Newsletters</span>
                              <span className="font-bold text-red-600">3</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Categories</span>
                              <span className="font-bold text-green-600">5</span>
                            </div>
                          </div>
                        </div>

                        {/* Recent Newsletters */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                          <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Recent Newsletters
                          </h2>
                          <div className="space-y-3">
                            {[
                              { name: 'Tech Trends', date: 'Dec 28' },
                              { name: 'Design Weekly', date: 'Dec 26' },
                              { name: 'Startup Insights', date: 'Dec 24' },
                            ].map(newsletter => (
                              <div
                                key={newsletter.name}
                                className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-md transition-colors"
                              >
                                <span className="text-gray-700">{newsletter.name}</span>
                                <span className="text-gray-500 text-sm">{newsletter.date}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                          <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Quick Actions
                          </h2>
                          <div className="space-y-3">
                            <button className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition-colors">
                              Discover New Newsletters
                            </button>
                            <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors">
                              Manage Subscriptions
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Recommended Newsletters */}
                      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                          Recommended for You
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {[
                            { name: 'AI Insights', category: 'Technology' },
                            { name: 'Design Digest', category: 'Design' },
                            { name: 'Startup Pulse', category: 'Entrepreneurship' },
                            { name: 'Data Science Weekly', category: 'Technology' },
                          ].map(newsletter => (
                            <div
                              key={newsletter.name}
                              className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow"
                            >
                              <h3 className="font-bold text-gray-800">{newsletter.name}</h3>
                              <p className="text-sm text-gray-500">{newsletter.category}</p>
                              <button className="mt-2 text-primary-600 bg-white border border-primary-600 px-3 py-1 rounded-md hover:bg-primary-50 transition-colors">
                                Add to My Newsletters
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/welcome" replace />
                )
              }
            />

            {/* Public Routes */}
            <Route path="/welcome" element={<HomePage />} />
            <Route path="/discover" element={<NewsletterDiscoveryPage />} />

            {/* Catch-all Route */}
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? '/' : '/welcome'} replace />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
