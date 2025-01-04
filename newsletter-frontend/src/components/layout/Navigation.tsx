import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline/UserCircleIcon';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline/ArrowLeftOnRectangleIcon';
import { HomeIcon } from '@heroicons/react/24/outline/HomeIcon';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import { Bars3Icon } from '@heroicons/react/24/outline/Bars3Icon';
import { XMarkIcon } from '@heroicons/react/24/outline/XMarkIcon';
import { BookOpenIcon } from '@heroicons/react/24/outline/BookOpenIcon';
import { StarIcon } from '@heroicons/react/24/outline/StarIcon';

// Icons

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Newsletter Discovery Logo" />
              <span className="ml-2 text-xl font-bold text-gray-800">Discover</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  <HomeIcon className="h-5 w-5 mr-2" />
                  Home
                </NavLink>
                <NavLink
                  to="/newsletters"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  <BookOpenIcon className="h-5 w-5 mr-2" />
                  Newsletters
                </NavLink>
                <NavLink
                  to="/reading-history"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  <StarIcon className="h-5 w-5 mr-2" />
                  Reading History
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                  Login
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/newsletters"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Newsletters
                  </NavLink>
                  <NavLink
                    to="/reading-history"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reading History
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
