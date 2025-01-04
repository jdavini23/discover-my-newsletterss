import React, { useState, useEffect, useMemo } from 'react';

// Icons
import {
  MagnifyingGlassIcon,
  StarIcon,
  TrashIcon,
  FolderIcon,
  ChartBarIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

// Stores

// Components

// Types

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'alphabetical' | 'mostRead';
type Category = string;
type EventData = {
  source?: string;
  message?: string;
  newsletterId?: string;
  severity?: 'info' | 'warning' | 'error';
};

const SubscriptionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { subscriptions, fetchSubscriptions, unsubscribeNewsletter } = useSubscriptionsStore();

  // Enhanced state management
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  // Compute unique categories from subscriptions
  const availableCategories = useMemo(() => {
    const categories = new Set<Category>();
    subscriptions.forEach(newsletter =>
      newsletter.categories?.forEach((cat: Category) => categories.add(cat))
    );
    return Array.from(categories);
  }, [subscriptions]);

  // Filtered and sorted subscriptions with advanced filtering
  const filteredSubscriptions = useMemo(() => {
    const result = subscriptions.filter(newsletter => {
      const matchesSearch = newsletter.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some(cat => newsletter.categories?.includes(cat));

      return matchesSearch && matchesCategories;
    });

    // Sorting logic
    switch (sortBy) {
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'mostRead':
        result.sort((a, b) => (b.readCount || 0) - (a.readCount || 0));
        break;
      default: // newest
        result.sort(
          (a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
        );
    }

    return result;
  }, [subscriptions, searchQuery, sortBy, selectedCategories]);

  // Subscription insights
  const subscriptionInsights = useMemo(
    () => ({
      totalSubscriptions: subscriptions.length,
      categoryCounts: availableCategories
        .map(category => ({
          category,
          count: subscriptions.filter(nl => nl.categories?.includes(category)).length,
        }))
        .sort((a, b) => b.count - a.count),
    }),
    [subscriptions, availableCategories]
  );

  // Lifecycle and data fetching
  useEffect(() => {
    if (user) {
      fetchSubscriptions(user.uid);
      trackEvent('page_view', {
        source: 'SubscriptionsPage',
        message: 'User viewed subscriptions',
        severity: 'info',
      } as EventData);
    }
  }, [user, fetchSubscriptions]);

  // Unsubscribe handler
  const handleUnsubscribe = (newsletterId: string) => {
    unsubscribeNewsletter(newsletterId);
    trackEvent('newsletter_unsubscribe', {
      source: 'SubscriptionsPage',
      message: `Unsubscribed from newsletter ${newsletterId}`,
      newsletterId,
      severity: 'info',
    } as EventData);
  };

  const renderNewsletterCard = (newsletter: Newsletter) => (
    <motion.div
      key={newsletter.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <NewsletterCard
        newsletter={newsletter}
        onUnsubscribe={() => handleUnsubscribe(newsletter.id)}
        viewMode={viewMode}
      />
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">My Subscriptions</h1>

        {/* Advanced Filtering and View Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search your subscriptions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="newest">Newest Subscriptions</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="mostRead">Most Read</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
            >
              <FolderIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
            >
              <ChartBarIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {availableCategories.map(category => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategories(prev =>
                  prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                )
              }
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedCategories.includes(category)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Subscription Insights */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <StarIcon className="w-8 h-8 mx-auto text-primary-500 mb-2" />
          <p className="font-bold">{subscriptionInsights.totalSubscriptions}</p>
          <p className="text-sm text-gray-600">Total Subscriptions</p>
        </div>
        <div className="text-center">
          <BellIcon className="w-8 h-8 mx-auto text-blue-500 mb-2" />
          <p className="font-bold">{availableCategories.length}</p>
          <p className="text-sm text-gray-600">Categories</p>
        </div>
        <div className="text-center">
          <ChartBarIcon className="w-8 h-8 mx-auto text-green-500 mb-2" />
          <p className="font-bold">{subscriptionInsights.categoryCounts[0]?.category || 'N/A'}</p>
          <p className="text-sm text-gray-600">Top Category</p>
        </div>
      </div>

      {/* Subscriptions Rendering */}
      {filteredSubscriptions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-500 py-12"
        >
          <StarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-xl">You haven't subscribed to any newsletters yet.</p>
          <button
            onClick={() => navigate('/newsletters')}
            className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
          >
            Discover Newsletters
          </button>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div
            className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}
          >
            {filteredSubscriptions.map(newsletter => (
              <motion.div
                key={newsletter.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                {renderNewsletterCard(newsletter)}
                <button
                  onClick={() => handleUnsubscribe(newsletter.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                  title="Unsubscribe"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default SubscriptionsPage;
