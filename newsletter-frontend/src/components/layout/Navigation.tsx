import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';

// Icons
import {
  UserCircleIcon,
  BookOpenIcon,
  StarIcon,
  LoginIcon,
  LogoutIcon,
  HomeIcon,
  SearchIcon,
  MagnifyingGlassIcon as SearchIcon,
  ArrowRightOnRectangleIcon as LoginIcon,
  ArrowLeftOnRectangleIcon as LogoutIcon,
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
} from '@heroicons/react/24/outline';

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
                  to="/newsletters"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  Newsletters
                </NavLink>
                <NavLink
                  to="/subscriptions"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  Subscriptions
                </NavLink>
                <NavLink
                  to="/reading-history"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  Reading History
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
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
                    to="/subscriptions"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Subscriptions
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
