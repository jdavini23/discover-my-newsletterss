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

// Import images
import techNewsletterImage from '@/assets/images/tech-newsletter.jpg';
import healthNewsletterImage from '@/assets/images/health-newsletter.jpg';
import productivityNewsletterImage from '@/assets/images/productivity-newsletter.jpg';

// Type Definitions
interface EventData {
  source?: string;
  message?: string;
  severity?: 'info' | 'warning' | 'error';
  error?: string;
}

interface Feature {
  id: string;
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

// Newsletter Carousel Component
const NewsletterCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredNewsletters = [
    {
      title: 'Tech Insights Weekly',
      description:
        'Deep dive into the latest technology trends, startup innovations, and industry insights',
      image: techNewsletterImage,
      tags: ['Technology', 'Innovation', 'Startups'],
    },
    {
      title: 'Startup Digest',
      description:
        'Curated insights for entrepreneurs, featuring success stories, funding news, and expert advice',
      image: productivityNewsletterImage,
      tags: ['Entrepreneurship', 'Business', 'Funding'],
    },
    {
      title: 'Health Horizons',
      description: 'Cutting-edge health research, wellness tips, and medical breakthroughs',
      image: healthNewsletterImage,
      tags: ['Health', 'Wellness', 'Science'],
    },
  ];

  const nextNewsletter = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredNewsletters.length);
  };

  const prevNewsletter = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredNewsletters.length) % featuredNewsletters.length);
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
              src={featuredNewsletters[currentIndex].image}
              alt={featuredNewsletters[currentIndex].title}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="w-2/3 p-6">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {featuredNewsletters[currentIndex].title}
            </h3>
            <p className="text-gray-600 mb-4">{featuredNewsletters[currentIndex].description}</p>
            <div className="flex items-center space-x-2">
              {featuredNewsletters[currentIndex].tags.map((tag) => (
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
          <ChevronLeftIcon className="w-5 h-5 text-primary-600" />
        </motion.button>
        <motion.button
          onClick={nextNewsletter}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white/90 transition-all"
        >
          <ChevronRightIcon className="w-5 h-5 text-primary-600" />
        </motion.button>
      </div>
    </div>
  );
};

// Categories Section
const CategorySection: React.FC = () => {
  const categories = [
    { name: 'Technology', icon: SparklesIcon, color: 'bg-blue-100' },
    { name: 'Health', icon: FireIcon, color: 'bg-green-100' },
    { name: 'Business', icon: UsersIcon, color: 'bg-yellow-100' },
    { name: 'Personal Development', icon: Cog6ToothIcon, color: 'bg-purple-100' },
  ];

  return (
    <section className="py-20 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Explore Newsletters by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={`${category.color} p-6 rounded-2xl text-center hover:shadow-xl transition-all group flex flex-col items-center justify-center`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                <category.icon className="mx-auto text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors text-center">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Professional',
      quote: 'Discover My Newsletters has transformed how I find and consume content!',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      name: 'Mike Chen',
      role: 'Tech Entrepreneur',
      quote: 'The personalized recommendations are incredibly accurate.',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Freelance Writer',
      quote: "I've discovered so many amazing newsletters I would have never found otherwise.",
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <p className="italic mb-4 text-gray-600">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ShowcaseSection = () => {
  const showcaseNewsletters = [
    {
      id: '1',
      title: 'Tech Horizons',
      description: 'Cutting-edge insights into emerging technologies',
      tags: ['AI', 'Startups', 'Innovation'],
      imageUrl: techNewsletterImage,
    },
    {
      id: '2',
      title: 'Wellness Weekly',
      description: 'Health and wellness strategies for modern living',
      tags: ['Fitness', 'Nutrition', 'Mental Health'],
      imageUrl: healthNewsletterImage,
    },
    {
      id: '3',
      title: 'Productivity Pulse',
      description: 'Maximize personal and professional efficiency',
      tags: ['Time Management', 'Efficiency', 'Career Growth'],
      imageUrl: productivityNewsletterImage,
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Discover Top Newsletters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseNewsletters.map((newsletter) => (
            <motion.div
              key={newsletter.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <img
                src={newsletter.imageUrl}
                alt={newsletter.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{newsletter.title}</h3>
                <p className="text-gray-600 mb-4">{newsletter.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {newsletter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
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
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [recommendations, setRecommendations] = useState<EnhancedRecommendation[]>([]);

  const { user } = useAuthStore();
  const { newsletters } = useNewsletterStore();
  const { recommendations: storeRecommendations } = useRecommendationStore();

  const fetchUserData = useCallback(async () => {
    if (!user) return;

    try {
      // Fetch user-specific data or recommendations
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Process user data if needed
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load user data');
    }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [user, fetchUserData]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      navigate(`/discovery?query=${encodeURIComponent(query)}`);
    },
    [navigate]
  );

  const handleEmailSubscription = useCallback(async () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    setIsSubscribing(true);
    try {
      // Implement newsletter signup logic
      toast.success('Successfully subscribed!');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to subscribe');
    } finally {
      setIsSubscribing(false);
    }
  }, [email]);

  const RecommendationModal: React.FC<RecommendationModalProps> = ({
    recommendations,
    onClose,
  }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Personalized Recommendations</h2>
        {recommendations.map(({ newsletter, score }) => (
          <div key={newsletter.id} className="mb-4">
            <h3>{newsletter.title}</h3>
            <p>Recommendation Score: {score.toFixed(2)}</p>
          </div>
        ))}
        <button onClick={onClose} className="mt-4 bg-primary-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </motion.div>
  );

  const features: Feature[] = [
    {
      id: 'personalized-recommendations',
      title: 'Personalized Recommendations',
      description: 'Get newsletters curated to match your interests.',
      icon: LightBulbIcon,
    },
    {
      id: 'advanced-filters',
      title: 'Advanced Filters',
      description: 'Easily sort newsletters by topics, ratings, and more.',
      icon: FunnelIcon,
    },
    {
      id: 'seamless-management',
      title: 'Seamless Management',
      description: 'Organize and track your subscriptions effortlessly.',
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden relative">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#FF7E5F] text-white py-24 px-6 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-10"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-extrabold mb-6 tracking-tight"
          >
            Discover Your Perfect Newsletter
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl mb-10 text-gray-100"
          >
            AI-powered recommendations to help you find the most inspiring newsletters
          </motion.p>

          <div className="flex justify-center space-x-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search newsletters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-2 rounded-full"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex justify-center space-x-4"
          >
            <button
              onClick={() => navigate('/auth/signup')}
              className="px-8 py-3 bg-white text-primary-600 font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/discovery')}
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary-600 transition-colors"
            >
              Explore Now
            </button>
          </motion.div>
        </div>

        {/* Background Shapes and Animations */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"
        ></motion.div>
      </motion.section>

      {/* Showcase Section */}
      <ShowcaseSection />

      {/* Newsletter Carousel */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Popular Newsletters This Week
          </h2>
          <NewsletterCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Discover My Newsletters?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-xl shadow-md text-center transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategorySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Recommendations Section */}
      {user && storeRecommendations.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              Personalized Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storeRecommendations.map((rec) => (
                <div
                  key={rec.newsletterId}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all"
                >
                  {rec.newsletter.coverImageUrl && (
                    <img
                      src={rec.newsletter.coverImageUrl}
                      alt={rec.newsletter.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{rec.newsletter.title}</h3>
                    <p className="text-gray-600">{rec.newsletter.description}</p>
                    <button
                      onClick={() => navigate(`/newsletters/${rec.newsletterId}`)}
                      className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      View Newsletter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Reading Experience?</h2>
          <p className="text-xl mb-10 text-gray-100">
            Join thousands of curious minds and discover newsletters that inspire, educate, and
            entertain.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary-600 px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:bg-primary-50"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
