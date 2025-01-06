import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Your Newsletter Discovery Platform
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Discover newsletters that match your interests. We&#39;ll help you find the perfect reads.
        </p>
      </div>

      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Newsletter Discovery</h1>
          <nav className="space-x-4">
            {!isAuthenticated() ? (
              <>
                <Link
                  to="/login"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex-grow px-4 py-8">
        <div className="text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-800">
            Discover Your Perfect Newsletters
          </h2>
          <p className="mb-8 text-xl text-gray-600">
            Find, track, and manage newsletters that matter to you.
          </p>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Curated Selection</h3>
              <p className="text-gray-600">
                Discover newsletters across various topics and interests.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Easy Tracking</h3>
              <p className="text-gray-600">Keep track of your favorite newsletters in one place.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Personalized Recommendations</h3>
              <p className="text-gray-600">
                Get tailored newsletter suggestions based on your interests.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700">
              We&#39;ll help you curate the perfect newsletter collection.
            </p>
          </div>

          {!isAuthenticated() && (
            <div className="mt-12">
              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-lg text-white transition duration-300 hover:bg-indigo-700"
              >
                Get Started - It&#39;s Free!
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 py-6 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Newsletter Discovery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
