import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Icons
import PersonalizedIcon from '../components/icons/PersonalizedIcon';
import FilterIcon from '../components/icons/FilterIcon';
import CommunityIcon from '../components/icons/CommunityIcon';
import ManageIcon from '../components/icons/ManageIcon';

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

  const nextNewsletter = () => {
    setCurrentIndex(prev => (prev + 1) % newsletters.length);
  };

  const prevNewsletter = () => {
    setCurrentIndex(prev => (prev - 1 + newsletters.length) % newsletters.length);
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
              src={newsletters[currentIndex].image}
              alt={newsletters[currentIndex].title}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="w-2/3 p-6">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {newsletters[currentIndex].title}
            </h3>
            <p className="text-gray-600 mb-4">{newsletters[currentIndex].description}</p>
            <div className="flex items-center space-x-2">
              {newsletters[currentIndex].tags.map(tag => (
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
          <FaChevronLeft className="text-primary-600" />
        </motion.button>
        <motion.button
          onClick={nextNewsletter}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white/90 transition-all"
        >
          <FaChevronRight className="text-primary-600" />
        </motion.button>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample categories (you can expand or fetch these dynamically)
  const categories = [
    { name: 'Technology', icon: PersonalizedIcon, color: 'bg-blue-100' },
    { name: 'Health', icon: FilterIcon, color: 'bg-red-100' },
    { name: 'Productivity', icon: CommunityIcon, color: 'bg-green-100' },
    { name: 'Finance', icon: ManageIcon, color: 'bg-yellow-100' },
    { name: 'Design', icon: PersonalizedIcon, color: 'bg-purple-100' },
    { name: 'Travel', icon: FilterIcon, color: 'bg-indigo-100' },
    { name: 'Science', icon: CommunityIcon, color: 'bg-teal-100' },
    { name: 'Arts', icon: ManageIcon, color: 'bg-pink-100' },
  ];

  // Expanded featured newsletters with more details
  const featuredNewsletters = [
    {
      title: 'Tech Insights Weekly',
      description:
        'Deep dive into the latest technology trends, startup innovations, and industry insights',
      image: 'https://via.placeholder.com/600x400?text=Tech+Insights+Weekly',
      tags: ['Technology', 'Innovation', 'Startups'],
    },
    {
      title: 'Startup Digest',
      description:
        'Curated insights for entrepreneurs, featuring success stories, funding news, and expert advice',
      image: 'https://via.placeholder.com/600x400?text=Startup+Digest',
      tags: ['Entrepreneurship', 'Business', 'Funding'],
    },
    {
      title: 'Design Trends',
      description:
        'Cutting-edge design inspiration, UX/UI best practices, and creative industry highlights',
      image: 'https://via.placeholder.com/600x400?text=Design+Trends',
      tags: ['Design', 'Creativity', 'UX/UI'],
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-all"
              >
                <FaSearch />
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

      {/* Features Section with Custom Illustrations */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose Our Newsletter Discovery Platform?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {categories.map(category => (
              <FeatureIllustration
                key={category.name}
                icon={category.icon}
                title={category.name}
                description="AI-powered suggestions tailored to your interests"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <WaveDivider />

      {/* Categories Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className={`${category.color} p-6 rounded-2xl text-center hover:shadow-xl transition-all group flex flex-col items-center justify-center`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon && <category.icon />}
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors text-center">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
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
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
