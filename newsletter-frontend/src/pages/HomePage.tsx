import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

import {
  Newsletter,
  User,
  RecommendationContext,
  RecommendationScore,
  UserPreference,
} from '../types';
import { useRecommendationStore } from '../stores/recommendationStore';
import { useAuthStore } from '../stores/authStore';
import { useNewsletterStore } from '../stores/newsletterStore';

import {
  UserIcon,
  MagnifyingGlassIcon as SearchIcon,
  FunnelIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftIcon,
  DocumentTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  FireIcon,
  LightBulbIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { recommendationService } from '@/services/recommendationService';
import { trackEvent } from '@/utils/analytics';

// Type Definitions
interface EventData {
  source?: string;
  message?: string;
  severity?: 'info' | 'warning' | 'error';
  error?: string;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface EnhancedRecommendation {
  newsletterId: string;
  newsletter: Newsletter;
  score: number;
}

interface RecommendationModalProps {
  recommendations: EnhancedRecommendation[];
  onClose: () => void;
}

// Feature Icons
const PersonalizedIcon = UserIcon;
const FilteredIcon = FunnelIcon;
const CommunityIcon = UsersIcon;
const ManageIcon = Cog6ToothIcon;
const AnalyticsIcon = ChartBarIcon;
const DiscussionIcon = ChatBubbleOvalLeftIcon;
const ContentIcon = DocumentTextIcon;

// Import images

// SVG Illustrations
const WaveDivider = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    className="w-full fill-current text-gray-100 -mt-1"
  >
    <path
      fillOpacity="1"
      d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,192C672,171,768,149,864,160C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>
);

const FeatureIllustration: React.FC<Feature> = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center space-y-4 transform transition-all duration-300 hover:shadow-xl"
  >
    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
      {Icon && <Icon className="w-8 h-8 text-primary-600" />}
    </div>
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const NewsletterCarousel: React.FC<{
  newsletters: Array<{
    title: string;
    description: string;
    image: string;
    tags: string[];
  }>;
}> = ({ newsletters }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  // Defensive check for empty newsletters array
  if (!newsletters || !Array.isArray(newsletters) || newsletters.length === 0) {
    console.error('No newsletters provided to NewsletterCarousel');
    return null;
  }

  const nextNewsletter = () => {
    setCurrentIndex(prev => (prev + 1) % newsletters.length);
  };

  const prevNewsletter = () => {
    setCurrentIndex(prev => (prev - 1 + newsletters.length) % newsletters.length);
  };

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="flex items-center bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="w-1/3">
            <img
              src={
                imageError[currentIndex]
                  ? 'https://via.placeholder.com/400x300?text=Newsletter'
                  : newsletters[currentIndex].image
              }
              alt={newsletters[currentIndex].title}
              className="w-full h-64 object-cover"
              onError={() => handleImageError(currentIndex)}
            />
          </div>
          <div className="w-2/3 p-6">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {newsletters[currentIndex].title}
            </h3>
            <p className="text-gray-600 mb-4">{newsletters[currentIndex].description}</p>
            <div className="flex items-center space-x-2">
              {Array.isArray(newsletters[currentIndex].tags) &&
                newsletters[currentIndex].tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
        <motion.button
          onClick={prevNewsletter}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50"
        >
          {React.createElement(ChevronLeftIcon, { className: 'w-5 h-5 text-primary-600' })}
        </motion.button>
        <motion.button
          onClick={nextNewsletter}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50"
        >
          {React.createElement(ChevronRightIcon, { className: 'w-5 h-5 text-primary-600' })}
        </motion.button>
      </div>
    </div>
  );
};

// Trending Newsletters
const trendingNewsletters = [
  {
    id: 1,
    title: 'Tech Pulse',
    author: 'Silicon Valley Insights',
    subscribers: 45000,
    description: 'Cutting-edge tech trends and startup stories',
    tags: ['Technology', 'Startups'],
    image: 'https://via.placeholder.com/300x200?text=Tech+Pulse',
  },
  {
    id: 2,
    title: 'Climate Horizons',
    author: 'Green Future Network',
    subscribers: 32000,
    description: 'Innovative solutions for a sustainable world',
    tags: ['Environment', 'Sustainability'],
    image: 'https://via.placeholder.com/300x200?text=Climate+Horizons',
  },
  {
    id: 3,
    title: 'AI Frontier',
    author: 'Machine Learning Digest',
    subscribers: 55000,
    description: 'Deep dives into artificial intelligence breakthroughs',
    tags: ['AI', 'Technology'],
    image: 'https://via.placeholder.com/300x200?text=AI+Frontier',
  },
];

// Recommendation Badge Component
const RecommendationBadge: React.FC<{
  recommendations: EnhancedRecommendation[];
}> = ({ recommendations }) => {
  const [showModal, setShowModal] = useState(false);

  if (recommendations.length === 0) return null;

  return (
    <>
      <motion.div
        className="fixed top-24 right-6 bg-primary-600 text-white rounded-full px-4 py-2 cursor-pointer shadow-lg z-40"
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="flex items-center">
          <SparklesIcon className="w-5 h-5 mr-2" />
          {recommendations.length} New Recommendations
        </div>
      </motion.div>

      {showModal && (
        <RecommendationModal
          recommendations={recommendations}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

const RecommendationModal: React.FC<RecommendationModalProps> = ({ recommendations, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Your Personalized Recommendations</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-4 mb-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{rec.newsletter.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{rec.newsletter.description}</p>
                </div>
                <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-xs font-semibold">
                  {(rec.score * 100).toFixed(0)}% Match
                </span>
              </div>
              <div className="flex space-x-2 mt-2">
                {rec.newsletter.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="bg-primary-50 text-primary-600 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm"
                  onClick={() => {
                    // TODO: Implement newsletter preview or details navigation
                    window.open(`/newsletter/${rec.newsletterId}`, '_blank');
                  }}
                >
                  View Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm"
                  onClick={() => {
                    // TODO: Implement dismiss/not interested logic
                    console.log('Dismiss recommendation', rec.newsletterId);
                  }}
                >
                  Not Interested
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState<EnhancedRecommendation[]>([]);
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);
  const { user } = useAuthStore();
  const [userData, setUserData] = useState<User | null>(null);

  // Fetch user data when user changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const fetchedUserData = userDoc.data();
          if (fetchedUserData) {
            setUserData(fetchedUserData as User);
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Update the recommendation fetching logic
  const fetchRecommendations = useCallback(async () => {
    if (!user) {
      console.log('HOMEPAGE: No user, skipping recommendations');
      return;
    }

    try {
      // Prepare recommendation context
      const context: RecommendationContext = {
        userId: user.uid,
        preferences: {
          categories: userData?.newsletterPreferences?.categories ?? [],
          topics: userData?.interests ?? [],
        },
        currentInterests: userData?.interests ?? [],
      };

      const recommendationScores = await recommendationService.generateRecommendations(context);

      if (!recommendationScores?.length) {
        console.log('No recommendations found');
        return;
      }

      // Fetch full newsletter details for each recommendation
      const enhancedRecommendations = await Promise.all(
        recommendationScores.map(async (rec): Promise<EnhancedRecommendation> => {
          const newsletterDoc = await getDoc(doc(db, 'newsletters', rec.newsletterId));
          const newsletter = newsletterDoc.data();

          if (!newsletter) {
            throw new Error(`Newsletter not found: ${rec.newsletterId}`);
          }

          return {
            newsletterId: rec.newsletterId,
            newsletter: {
              ...(newsletter as Newsletter),
              id: rec.newsletterId,
            },
            score: rec.score,
          };
        })
      );

      setRecommendations(enhancedRecommendations);
      setIsRecommendationModalOpen(true);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Failed to fetch recommendations. Please try again later.');
    }
  }, [user, userData]);

  // Enhanced search handler with error handling
  const handleSearch = useCallback(() => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      toast.error('Please enter a search term');
      return;
    }

    try {
      // Track search event
      trackEvent('newsletter_search', {
        message: 'Search for newsletters',
        severity: 'info',
        context: {
          query: trimmedQuery,
          source: 'homepage_search',
          timestamp: new Date().toISOString(),
        },
      });

      navigate('/newsletters', {
        state: {
          searchQuery: trimmedQuery,
          source: 'homepage',
        },
      });
    } catch (error) {
      console.error('Error during search:', error);
      toast.error('Failed to process search. Please try again.');
    }
  }, [searchQuery, navigate]);

  // Sample categories (you can expand or fetch these dynamically)
  const categoriesList = [
    { name: 'Technology', icon: PersonalizedIcon, color: 'bg-blue-100' },
    { name: 'Health', icon: FilteredIcon, color: 'bg-red-100' },
    { name: 'Productivity', icon: CommunityIcon, color: 'bg-green-100' },
    { name: 'Finance', icon: ManageIcon, color: 'bg-yellow-100' },
    { name: 'Design', icon: AnalyticsIcon, color: 'bg-purple-100' },
    { name: 'Travel', icon: DiscussionIcon, color: 'bg-indigo-100' },
    { name: 'Science', icon: ContentIcon, color: 'bg-teal-100' },
    { name: 'Arts', icon: UserIcon, color: 'bg-pink-100' },
  ] as const;

  // Expanded featured newsletters with more details
  const featuredNewsletters = [
    {
      title: 'Tech Weekly',
      description: 'Stay updated with the latest in technology and innovation.',
      image: techNewsletterImage,
      tags: ['Technology', 'Innovation'],
    },
    {
      title: 'Health & Wellness',
      description: 'Tips and insights for a healthier lifestyle.',
      image: healthNewsletterImage,
      tags: ['Health', 'Wellness'],
    },
    {
      title: 'Business Insider',
      description: 'Expert analysis on business trends and market insights.',
      image: businessNewsletterImage,
      tags: ['Business', 'Finance'],
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Professional',
      quote: 'Finally, a platform that helps me discover amazing newsletters!',
      avatar: 'https://via.placeholder.com/150?text=SJ',
    },
    {
      name: 'Mike Chen',
      role: 'Tech Enthusiast',
      quote: 'Personalized recommendations are spot on!',
      avatar: 'https://via.placeholder.com/150?text=MC',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Freelance Writer',
      quote: 'Easy to use and discover new content.',
      avatar: 'https://via.placeholder.com/150?text=ER',
    },
  ];

  const features: Feature[] = [
    {
      title: 'Discover Newsletters',
      description: 'Find the best newsletters tailored to your interests',
      icon: SparklesIcon,
    },
    {
      title: 'Personalized Recommendations',
      description: 'Get curated newsletters based on your preferences',
      icon: PersonalizedIcon,
    },
    {
      title: 'Community Insights',
      description: 'Learn from our community of readers and experts',
      icon: CommunityIcon,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden relative">
      {/* Existing content, but wrap main content in a container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section with Search Bar */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#FF7E5F] text-white py-24 px-6 text-center overflow-hidden"
        >
          {/* Animated Background Shapes */}
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 1.2, 1],
                opacity: [0, 0.2, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-10 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 1.2, 1],
                opacity: [0, 0.2, 0.1],
                rotate: [0, -360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute bottom-10 left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"
            />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              Discover Newsletters That Spark Your Curiosity
            </h1>
            <p className="text-xl mb-10 text-gray-100 max-w-2xl mx-auto">
              Personalized recommendations, curated insights, and endless learning at your
              fingertips
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-xl mx-auto mb-10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search newsletters by topic, category, or keyword"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-all"
                >
                  {React.createElement(SearchIcon, { className: 'w-5 h-5' })}
                </button>
              </div>
            </div>

            <div className="space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:bg-primary-50"
              >
                Get Started
              </motion.button>
              <motion.button
                onClick={() => navigate('/newsletters')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all"
              >
                Explore Now
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

        {/* Newsletter Preview Carousel */}
        <section className="bg-gray-100 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
              Popular Newsletters This Week
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Discover trending newsletters curated by our community of readers
            </p>
            <NewsletterCarousel newsletters={featuredNewsletters} />
          </div>
        </section>

        {/* Features and Categories Section */}
        <section className="bg-gray-100 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
              Explore Newsletter Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {categoriesList.map(category => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className={`${category.color} p-6 rounded-2xl text-center hover:shadow-xl transition-all group flex flex-col items-center justify-center`}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {React.createElement(category.icon, {
                      className: 'w-12 h-12 text-primary-600',
                    })}
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors text-center">
                    {category.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-100 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureIllustration key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Newsletters Section */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              {React.createElement(FireIcon, { className: 'w-12 h-12 text-orange-500 mr-4' })}
              <h2 className="text-4xl font-bold text-gray-800">Trending Newsletters</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {trendingNewsletters.map(newsletter => (
                <motion.div
                  key={newsletter.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <img
                    src={newsletter.image}
                    alt={newsletter.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{newsletter.title}</h3>
                      <span className="text-sm text-gray-500">
                        {newsletter.subscribers.toLocaleString()} subscribers
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{newsletter.description}</p>
                    <div className="flex space-x-2">
                      {newsletter.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup CTA */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 rounded-2xl p-10"
            >
              <div className="flex justify-center mb-6">
                {React.createElement(SparklesIcon, { className: 'w-16 h-16 text-yellow-300' })}
              </div>
              <h2 className="text-4xl font-bold mb-4">Never Miss a Great Newsletter</h2>
              <p className="text-xl mb-8 text-gray-200">
                Get personalized newsletter recommendations delivered straight to your inbox
              </p>
              <form onSubmit={e => e.preventDefault()} className="max-w-xl mx-auto flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value=""
                  onChange={() => {}}
                  required
                  className="flex-grow px-6 py-4 rounded-l-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={false}
                  className="bg-primary-600 text-white px-8 py-4 rounded-r-full hover:bg-primary-700 transition-all disabled:opacity-50"
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              {React.createElement(LightBulbIcon, { className: 'w-12 h-12 text-yellow-500 mr-4' })}
              <h2 className="text-4xl font-bold text-gray-800">What Our Community Says</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <p className="italic mb-4 text-gray-600 text-lg">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Wave Divider */}
        <WaveDivider />
      </div>

      {/* Recommendations Badge */}
      {user && recommendations.length > 0 && (
        <RecommendationBadge recommendations={recommendations} />
      )}
    </div>
  );
};

export default HomePage;
