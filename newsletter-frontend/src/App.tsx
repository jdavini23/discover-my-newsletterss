import { AuthPage } from './pages/AuthPage';
import { NewsletterDiscoveryPage } from './pages/NewsletterDiscoveryPage';
import { NewsletterDetailPage } from './pages/NewsletterDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { HomePage } from './pages/HomePage';
import { Layout } from './components/layout/Layout';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ReadingHistoryPage } from './pages/ReadingHistoryPage';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/auth"
            element={!isAuthenticated ? <AuthPage /> : <Navigate to="/newsletters" replace />}
          />
          <Route path="/newsletters" element={<NewsletterDiscoveryPage />} />
          <Route
            path="/newsletters/:newsletterId"
            element={isAuthenticated ? <NewsletterDetailPage /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/subscriptions"
            element={
              <ProtectedRoute>
                <SubscriptionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reading-history"
            element={
              <ProtectedRoute>
                <ReadingHistoryPage />
              </ProtectedRoute>
            }
          />
          {/* Catch-all route to handle undefined routes */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? '/newsletters' : '/auth'} replace />}
          />
        </Routes>
        <Toaster position="top-right" />
      </Layout>
    </Router>
  );
}

export default App;
