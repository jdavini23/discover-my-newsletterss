import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Newsletter Discovery</h1>
          <nav className="space-x-4">
            {!isAuthenticated() ? (
              <>
                <Link 
                  to="/login" 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link 
                to="/dashboard" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Discover Your Perfect Newsletters
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Find, track, and manage newsletters that matter to you.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Curated Selection</h3>
              <p className="text-gray-600">
                Discover newsletters across various topics and interests.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Easy Tracking</h3>
              <p className="text-gray-600">
                Keep track of your favorite newsletters in one place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
              <p className="text-gray-600">
                Get tailored newsletter suggestions based on your interests.
              </p>
            </div>
          </div>

          {!isAuthenticated() && (
            <div className="mt-12">
              <Link 
                to="/register" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700 transition duration-300"
              >
                Get Started - It's Free!
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Newsletter Discovery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
