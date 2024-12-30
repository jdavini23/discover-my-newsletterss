import React, { useState, useEffect } from 'react';
import { useNewsletterStore } from '@/stores/newsletterStore';
import { useUserProfileStore } from '@/stores/userProfileStore';
import { useAuthStore } from '@/stores/authStore';

// Predefined topics matching user profile
const NEWSLETTER_TOPICS = [
  'Technology', 'Science', 'Business', 'Startups', 
  'Design', 'Programming', 'Entrepreneurship', 
  'AI', 'Crypto', 'Marketing'
];

const NewsletterDiscoveryPage: React.FC = () => {
  const { 
    newsletters, 
    discoverNewsletters, 
    recommendedNewsletters,
    getRecommendedNewsletters,
    subscribeNewsletter, 
    unsubscribeNewsletter, 
    userSubscriptions,
    recordInteraction,
    isLoading,
    error 
  } = useNewsletterStore();
  const { profile } = useUserProfileStore();
  const { user } = useAuthStore();

  // Filter and sorting states
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    profile?.newsletterPreferences?.interestedTopics || []
  );
  const [sortBy, setSortBy] = useState<'popularity' | 'recent' | 'rating' | 'recommended'>('popularity');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch newsletters on component mount and when filters change
  useEffect(() => {
    if (sortBy === 'recommended') {
      getRecommendedNewsletters();
    } else {
      discoverNewsletters({
        topics: selectedTopics,
        sortBy,
        searchQuery
      });
    }
  }, [selectedTopics, sortBy, searchQuery]);

  // Record view interaction when newsletter is displayed
  useEffect(() => {
    newsletters.forEach(newsletter => {
      recordInteraction(newsletter.id, 'view');
    });
  }, [newsletters]);

  // Check if a newsletter is subscribed
  const isSubscribed = (newsletterId: string) => 
    userSubscriptions.some(sub => sub.id === newsletterId);

  // Handle topic selection
  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  // Handle newsletter subscription/unsubscription
  const handleSubscription = async (newsletterId: string) => {
    try {
      if (isSubscribed(newsletterId)) {
        await unsubscribeNewsletter(newsletterId);
      } else {
        await subscribeNewsletter(newsletterId);
      }
    } catch (err) {
      console.error('Subscription error', err);
    }
  };

  // Determine which newsletters to display
  const displayNewsletters = sortBy === 'recommended' 
    ? recommendedNewsletters 
    : newsletters;

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <div className="w-full px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {sortBy === 'recommended' ? 'Recommended Newsletters' : 'Discover Newsletters'}
          </h1>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Input */}
            <div>
              <input 
                type="text" 
                placeholder="Search newsletters..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Topic Filters */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Filter by Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {NEWSLETTER_TOPICS.map(topic => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTopics.includes(topic)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popularity' | 'recent' | 'rating' | 'recommended')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="popularity">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rated</option>
                <option value="recommended">Recommended for You</option>
              </select>
            </div>
          </div>

          {/* Newsletter Grid */}
          {isLoading ? (
            <div className="text-center text-gray-500">Loading newsletters...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : displayNewsletters.length === 0 ? (
            <div className="text-center text-gray-500">
              {sortBy === 'recommended' 
                ? 'No personalized recommendations yet. Keep exploring!' 
                : 'No newsletters found'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayNewsletters.map(newsletter => (
                <div 
                  key={newsletter.id} 
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  {/* Newsletter Cover Image */}
                  {newsletter.coverImageUrl && (
                    <img 
                      src={newsletter.coverImageUrl} 
                      alt={newsletter.title} 
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {newsletter.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {newsletter.description}
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {newsletter.topics.slice(0, 3).map(topic => (
                        <span 
                          key={topic} 
                          className="px-2 py-1 bg-gray-200 text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Subscriber Count */}
                    <div className="text-sm text-gray-500 mb-4">
                      {newsletter.subscriberCount || 0} subscribers
                    </div>

                    {/* Subscribe/Unsubscribe Button */}
                    <button
                      onClick={() => handleSubscription(newsletter.id)}
                      className={`w-full py-2 rounded-md ${
                        isSubscribed(newsletter.id)
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-primary-500 text-white hover:bg-primary-600'
                      }`}
                    >
                      {isSubscribed(newsletter.id) ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterDiscoveryPage;
