import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, StarIcon, BookmarkIcon } from '@radix-ui/react-icons';
import { Tooltip } from '../common/Tooltip';
import { useNotificationStore } from '../../stores/rootStore';

interface Newsletter {
  id: string;
  name: string;
  description: string;
  category: string;
  subscriptionCount: number;
  rating: number;
}

export const NewsletterSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [filteredNewsletters, setFilteredNewsletters] = useState<Newsletter[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { addNotification } = useNotificationStore();

  // Mock newsletter data - replace with actual API call
  const NEWSLETTER_CATEGORIES = [
    'Technology',
    'Business',
    'Science',
    'Arts',
    'Finance',
    'Health',
    'Politics',
    'Sports',
    'Entertainment',
  ];

  useEffect(() => {
    // Simulated newsletter fetch
    const mockNewsletters: Newsletter[] = [
      {
        id: '1',
        name: 'Tech Insider',
        description: 'Latest trends in technology and innovation',
        category: 'Technology',
        subscriptionCount: 5000,
        rating: 4.5,
      },
      {
        id: '2',
        name: 'Business Horizons',
        description: 'Insights for entrepreneurs and business leaders',
        category: 'Business',
        subscriptionCount: 3500,
        rating: 4.2,
      },
      // Add more mock newsletters
    ];

    setNewsletters(mockNewsletters);
    setFilteredNewsletters(mockNewsletters);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = newsletters.filter(
      (newsletter) =>
        newsletter.name.toLowerCase().includes(term.toLowerCase()) ||
        newsletter.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredNewsletters(filtered);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );

    const filtered = newsletters.filter(
      (newsletter) =>
        selectedCategories.length === 0 || selectedCategories.includes(newsletter.category)
    );
    setFilteredNewsletters(filtered);
  };

  const handleSubscribe = (newsletter: Newsletter) => {
    addNotification({
      message: `Subscribed to ${newsletter.name}`,
      type: 'success',
    });
    // TODO: Implement actual subscription logic
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="mb-6 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search newsletters..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {NEWSLETTER_CATEGORIES.map((category) => (
          <Tooltip key={category} content={`Filter by ${category}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              {category}
            </motion.button>
          </Tooltip>
        ))}
      </div>

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNewsletters.map((newsletter) => (
          <motion.div
            key={newsletter.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-bold mb-2">{newsletter.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{newsletter.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <StarIcon className="text-yellow-500 mr-1" />
                <span>{newsletter.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                {newsletter.subscriptionCount} subscribers
              </span>
            </div>

            <div className="flex space-x-2">
              <Tooltip content="Subscribe to newsletter">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubscribe(newsletter)}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Subscribe
                </motion.button>
              </Tooltip>
              <Tooltip content="Save for later">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <BookmarkIcon />
                </motion.button>
              </Tooltip>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredNewsletters.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No newsletters found matching your search
        </div>
      )}
    </motion.div>
  );
};
