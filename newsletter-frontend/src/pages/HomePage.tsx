import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/analytics';
import { measurePerformance } from '../utils/performance';
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
} from '@heroicons/react/24/outline';

// Feature Icons
const PersonalizedIcon = UserIcon;
const FilteredIcon = FunnelIcon;
const CommunityIcon = UsersIcon;
const ManageIcon = Cog6ToothIcon;
const AnalyticsIcon = ChartBarIcon;
const DiscussionIcon = ChatBubbleOvalLeftIcon;
const ContentIcon = DocumentTextIcon;

// Import images
import techNewsletterImage from '@/assets/images/tech-newsletter.jpg';
import healthNewsletterImage from '@/assets/images/health-newsletter.jpg';
import businessNewsletterImage from '@/assets/images/business-newsletter.jpg';

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

interface FeatureIllustrationProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureIllustration: React.FC<FeatureIllustrationProps> = ({
  icon: Icon,
  title,
  description,
}) => (
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
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white/90 transition-all"
        >
          {React.createElement(ChevronLeftIcon, { className: 'w-5 h-5 text-primary-600' })}
        </motion.button>
        <motion.button
          onClick={nextNewsletter}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white/90 transition-all"
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Performance tracking
  useEffect(() => {
    const performanceTracker = measurePerformance('HomePage');
    return () => performanceTracker.end();
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      // Track search event
      trackEvent('newsletter_search', {
        message: `Search for newsletters`,
        severity: 'info',
        context: {
          query: searchQuery,
          source: 'homepage_search',
        },
      });
      navigate('/newsletters', { state: { searchQuery } });
    }
  }, [searchQuery, navigate]);

  const handleSubscribe = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (email) {
        // Track subscription attempt
        trackEvent('newsletter_signup_attempt', {
          message: `Signup attempt from homepage`,
          context: {
            email: email.replace(/(.{2}).*(?=@)/, '***'),
            source: 'homepage_signup',
          },
          severity: 'info',
        });

        setIsSubscribing(true);

        // Simulated subscription process with error handling
        setTimeout(() => {
          try {
            // Simulate API call
            trackEvent('newsletter_signup_success', {
              source: 'homepage_signup',
            });

            alert(`Thanks for subscribing with ${email}!`);
            setEmail('');
          } catch (error) {
            trackEvent('newsletter_signup_error', {
              error: error instanceof Error ? error.message : 'Unknown error',
              source: 'homepage_signup',
            });
            alert('Failed to subscribe. Please try again.');
          } finally {
            setIsSubscribing(false);
          }
        }, 1500);
      }
    },
    [email]
  );

  // Sample categories (you can expand or fetch these dynamically)
  const categories = [
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

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
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
            Personalized recommendations, curated insights, and endless learning at your fingertips
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-all"
              >
                {React.createElement(SearchIcon, { className: 'w-5 h-5' })}
              </motion.button>
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
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
            {categories.map(category => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className={`${category.color} p-6 rounded-2xl text-center hover:shadow-xl transition-all group flex flex-col items-center justify-center`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {React.createElement(category.icon, { className: 'w-12 h-12 text-primary-600' })}
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors text-center">
                  {category.name}
                </h3>
              </motion.div>
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
            <form onSubmit={handleSubscribe} className="max-w-xl mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-grow px-6 py-4 rounded-l-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubscribing}
                className="bg-primary-600 text-white px-8 py-4 rounded-r-full hover:bg-primary-700 transition-all disabled:opacity-50"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
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
                key={testimonial.name}
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
  );
};

export default HomePage;
