import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import { Newsletter } from '@/types/firestore';
import { useNewsletterStore } from '@/stores/newsletterStore';

const NEWSLETTER_TOPICS = [
  'Technology',
  'Science',
  'Business',
  'Startups',
  'Design',
  'Programming',
  'Entrepreneurship',
  'AI',
  'Crypto',
  'Marketing',
];

const NewsletterDiscoveryPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    newsletters,
    discoverNewsletters,
    getRecommendedNewsletters,
    recommendedNewsletters,
    subscribeNewsletter,
    unsubscribeNewsletter,
    userSubscriptions,
    isLoading,
    error,
  } = useNewsletterStore();

  const [filteredNewsletters, setFilteredNewsletters] = useState<Newsletter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [sortBy] = useState<'popularity' | 'recent' | 'rating' | 'recommended'>('recommended');

  useEffect(() => {
    discoverNewsletters();
    getRecommendedNewsletters();
  }, [discoverNewsletters, getRecommendedNewsletters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterNewsletters(query, selectedTopics);
  };

  const handleTopicFilter = (topic: string) => {
    const newSelectedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter(t => t !== topic)
      : [...selectedTopics, topic];

    setSelectedTopics(newSelectedTopics);
    filterNewsletters(searchQuery, newSelectedTopics);
  };

  const filterNewsletters = (query: string, topics: string[]) => {
    let result = newsletters;

    if (query) {
      result = result.filter(
        (newsletter: Newsletter) =>
          newsletter.title.toLowerCase().includes(query.toLowerCase()) ||
          newsletter.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (topics.length > 0) {
      result = result.filter((newsletter: Newsletter) =>
        topics.some(topic => newsletter.topics.includes(topic))
      );
    }

    setFilteredNewsletters(result);
  };

  const renderNewsletterCard = (newsletter: Newsletter) => (
    <div
      key={newsletter.id}
      className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      {newsletter.coverImageUrl && (
        <img
          src={newsletter.coverImageUrl}
          alt={newsletter.title}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      )}
      <h2 className="text-xl font-bold mb-2">{newsletter.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{newsletter.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-gray-600">
          <ChevronRightIcon className="w-5 h-5 text-yellow-500" />
          <span>{newsletter.averageRating?.toFixed(1) || 'N/A'}</span>
        </div>
        <button
          onClick={() => navigate(`/newsletter/${newsletter.id}`)}
          className="text-blue-500 hover:text-blue-700"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const allTopics = Array.from(new Set(newsletters.flatMap(nl => nl.topics)));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Discover Newsletters</h1>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search newsletters..."
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <ChevronRightIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter by Topics</h2>
        <div className="flex flex-wrap gap-2">
          {NEWSLETTER_TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => handleTopicFilter(topic)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTopics.includes(topic)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600">Loading newsletters...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(sortBy === 'recommended'
            ? recommendedNewsletters.length > 0
              ? recommendedNewsletters
              : newsletters
            : filteredNewsletters.length > 0
              ? filteredNewsletters
              : newsletters
          ).map(renderNewsletterCard)}
        </div>
      )}

      {newsletters.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No newsletters found. Check back later!</p>
      )}
    </div>
  );
};

export default NewsletterDiscoveryPage;
