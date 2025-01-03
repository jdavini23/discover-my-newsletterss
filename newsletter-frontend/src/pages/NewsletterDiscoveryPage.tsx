import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { NewsletterService, NewsletterFilters } from '@/services/newsletterService';
import { Newsletter } from '@/stores/newsletterStore';
import { trackEvent } from '@/utils/analytics';
import NewsletterCard from '@/components/newsletter/NewsletterCard';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { NewsletterPreviewModal } from '@/components/newsletter/NewsletterPreviewModal';
import { useAuthStore } from '@/stores/authStore';

const CATEGORIES = [
  'Technology',
  'Science',
  'Business',
  'Design',
  'Health',
  'Finance',
  'Environment',
  'AI',
  'Startups',
  'Innovation',
];

const SORT_OPTIONS = [
  { value: 'subscribers_desc', label: 'Most Subscribers' },
  { value: 'subscribers_asc', label: 'Least Subscribers' },
  { value: 'rating_desc', label: 'Highest Rated' },
  { value: 'rating_asc', label: 'Lowest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

const SUBSCRIBER_RANGES = [
  { value: undefined, label: 'Any Size' },
  { value: 100, label: '100+ Subscribers' },
  { value: 1000, label: '1K+ Subscribers' },
  { value: 10000, label: '10K+ Subscribers' },
  { value: 100000, label: '100K+ Subscribers' },
];

const NewsletterDiscoveryPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [minSubscribers, setMinSubscribers] = useState<number | undefined>();
  const [minRating, setMinRating] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<string>('newest');
  const [totalNewsletters, setTotalNewsletters] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const pageSize = 12;

  useEffect(() => {
    // Show onboarding for new users
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
      localStorage.setItem('hasSeenOnboarding', 'true');
    }
  }, []);

  const searchNewsletters = useCallback(async () => {
    setLoading(true);
    try {
      const filters: NewsletterFilters = {
        pageSize,
        page: currentPage,
        categories: selectedCategories.length > 0 ? selectedCategories : undefined,
        searchQuery: searchQuery || undefined,
        minSubscribers,
        minRating,
        sortBy,
      };

      const response = await NewsletterService.fetchNewsletters(filters);
      setNewsletters(response.newsletters);
      setTotalNewsletters(response.total);

      trackEvent('newsletter_search', {
        categories: selectedCategories,
        query: searchQuery,
        sortBy,
        filters: {
          minSubscribers,
          minRating,
        },
      });
    } catch (error) {
      console.error('Failed to fetch newsletters', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategories, searchQuery, minSubscribers, minRating, sortBy, currentPage]);

  useEffect(() => {
    searchNewsletters();
  }, [searchNewsletters]);

  const handleNewsletterClick = (newsletterId: string) => {
    navigate(`/newsletters/${newsletterId}`);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setMinSubscribers(undefined);
    setMinRating(undefined);
    setSortBy('newest');
    setCurrentPage(1);
  };

  const handleSubscribeNewsletter = async (newsletterId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const subscriptionDetails = {
        frequency: 'weekly',
        topics: selectedCategories,
        emailPreferences: {
          promotions: true,
          recommendations: true,
        },
      };

      await NewsletterService.subscribeToNewsletter(newsletterId, user.email, subscriptionDetails);

      // Show success notification
      alert('Successfully subscribed to newsletter!');
      setSelectedNewsletter(null);
    } catch (error) {
      console.error('Subscription failed', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />

      {/* Newsletter Preview Modal */}
      {selectedNewsletter && (
        <NewsletterPreviewModal
          newsletter={selectedNewsletter}
          onClose={() => setSelectedNewsletter(null)}
          onSubscribe={handleSubscribeNewsletter}
        />
      )}

      <h1 className="text-3xl font-bold mb-6">Discover Newsletters</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search newsletters..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={searchNewsletters}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-2 rounded-full"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-full transition hover:bg-primary-700"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowFilterModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filter Newsletters</h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-500 hover:bg-gray-200 p-2 rounded-full transition-all hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        selectedCategories.includes(category)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscribers Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Subscribers
                </label>
                <select
                  value={minSubscribers || ''}
                  onChange={e =>
                    setMinSubscribers(e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {SUBSCRIBER_RANGES.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={minRating || ''}
                  onChange={e => setMinRating(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>

              {/* Sort Options */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    searchNewsletters();
                    setShowFilterModal(false);
                  }}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg transition hover:bg-primary-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Newsletter Grid */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : newsletters.length === 0 ? (
        <div className="text-center text-gray-500">
          No newsletters found. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.map(newsletter => (
            <NewsletterCard
              key={newsletter.id}
              newsletter={newsletter}
              onClick={() => handleNewsletterClick(newsletter.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalNewsletters > pageSize && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(totalNewsletters / pageSize)}
          </span>
          <button
            onClick={() =>
              setCurrentPage(prev => Math.min(Math.ceil(totalNewsletters / pageSize), prev + 1))
            }
            disabled={currentPage === Math.ceil(totalNewsletters / pageSize)}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsletterDiscoveryPage;
