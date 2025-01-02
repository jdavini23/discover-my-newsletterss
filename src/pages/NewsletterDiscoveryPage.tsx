import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

import { NewsletterService, NewsletterFilters } from '@/services/newsletterService';
import { Newsletter } from '@/stores/newsletterStore';
import { trackEvent } from '@/utils/analytics';
import NewsletterCard from '@/components/newsletter/NewsletterCard';

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

const NewsletterDiscoveryPage: React.FC = () => {
  const navigate = useNavigate();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchNewsletters = useCallback(async () => {
    setLoading(true);
    try {
      const filters: NewsletterFilters = {
        pageSize: 12,
        page: 1,
        categories: selectedCategories.length > 0 ? selectedCategories : undefined,
        searchQuery: searchQuery || undefined,
      };

      const response = await NewsletterService.fetchNewsletters(filters);
      setNewsletters(response.newsletters);
      trackEvent('newsletter_search', {
        categories: selectedCategories,
        query: searchQuery,
      });
    } catch (error) {
      console.error('Failed to fetch newsletters', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategories, searchQuery]);

  useEffect(() => {
    searchNewsletters();
  }, [searchNewsletters]);

  const handleNewsletterClick = (newsletterId: string) => {
    console.log('Newsletter clicked:', newsletterId);
    navigate(`/newsletters/${newsletterId}`);
    trackEvent('newsletter_detail_view', { newsletterId });
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Discover Newsletters</h1>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:flex-grow">
            <input
              type="text"
              placeholder="Search newsletters..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <div className="w-full md:w-auto">
            <button
              className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              onClick={() => {}}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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

        {/* Newsletters Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
            />
          </div>
        ) : newsletters.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {newsletters.map(newsletter => (
              <NewsletterCard
                key={newsletter.id}
                newsletter={newsletter}
                onClick={() => handleNewsletterClick(newsletter.id)}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-500">
            No newsletters found. Try adjusting your search or filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterDiscoveryPage;
