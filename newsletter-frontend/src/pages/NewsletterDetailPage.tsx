import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import useReadingHistoryStore, { ReadingHistoryItem } from '../stores/readingHistoryStore';
import { useNewsletterStore } from '../stores/newsletterStore';
import { useAuthStore } from '../stores/authStore';

import { Newsletter, NewsletterStats, NewsletterReview } from '../types';
import BackButton from '../components/common/BackButton';

import {
  ClockIcon,
  StarIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  BookmarkIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { NewsletterService } from '@/services/newsletterService';

const NewsletterDetailPage: React.FC = () => {
  const { newsletterId } = useParams<{ newsletterId: string }>();
  const navigate = useNavigate();
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [newsletterStats, setNewsletterStats] = useState<NewsletterStats | null>(null);
  const [reviews, setReviews] = useState<NewsletterReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userReview, setUserReview] = useState<{ rating: number; comment: string }>({
    rating: 0,
    comment: '',
  });

  // Reading history tracking
  const addToHistory = useReadingHistoryStore(state => state.addToHistory);
  const startTime = useRef(Date.now());
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchNewsletterDetails = async () => {
      if (!newsletterId) {
        setError('No newsletter ID provided');
        setLoading(false);
        return;
      }

      try {
        const [fetchedNewsletter, fetchedStats, fetchedReviews, subscriptionStatus] =
          await Promise.all([
            NewsletterService.fetchNewsletterById(newsletterId),
            NewsletterService.getNewsletterStats(newsletterId),
            NewsletterService.getNewsletterReviews(newsletterId),
            NewsletterService.checkSubscriptionStatus(newsletterId),
          ]);

        if (fetchedNewsletter) {
          setNewsletter(fetchedNewsletter);
          setNewsletterStats(fetchedStats);
          setReviews(fetchedReviews);
          setIsSubscribed(subscriptionStatus);
        } else {
          setError(`No newsletter found with ID: ${newsletterId}`);
          navigate('/newsletters');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`Failed to fetch newsletter details: ${errorMessage}`);
        console.error('Newsletter fetch error:', err);
        navigate('/newsletters');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletterDetails();

    // Cleanup function to track reading time
    return () => {
      if (newsletter) {
        const readDuration = Math.round((Date.now() - startTime.current) / 1000);
        addToHistory(newsletter, readDuration);
      }
    };
  }, [newsletterId, navigate, addToHistory]);

  const handleSubscribe = async () => {
    if (!newsletterId) return;

    try {
      await NewsletterService.subscribeNewsletter(newsletterId);
      setIsSubscribed(true);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  const handleUnsubscribe = async () => {
    if (!newsletterId) return;

    try {
      await NewsletterService.unsubscribeNewsletter(newsletterId);
      setIsSubscribed(false);
    } catch (error) {
      console.error('Unsubscription error:', error);
    }
  };

  const handleSubmitReview = async () => {
    if (!newsletterId || !user) return;

    try {
      await NewsletterService.submitNewsletterReview(
        newsletterId,
        userReview.rating,
        userReview.comment
      );
      // Refresh reviews
      const updatedReviews = await NewsletterService.getNewsletterReviews(newsletterId);
      setReviews(updatedReviews);
      // Reset user review
      setUserReview({ rating: 0, comment: '' });
    } catch (error) {
      console.error('Review submission error:', error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <ExclamationTriangleIcon className="mx-auto w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
        <button
          onClick={() => navigate('/newsletters')}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          Back to Newsletters
        </button>
      </div>
    );
  }

  if (!newsletter) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <BackButton className="mr-4" />
        <h1 className="text-3xl font-bold">{newsletter.title}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Newsletter Details Column */}
        <div className="md:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={newsletter.imageUrl}
              alt={newsletter.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <p className="text-gray-600 mb-4">{newsletter.description}</p>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <UsersIcon className="w-6 h-6 mr-2 text-primary-500" />
                  <span>{newsletterStats?.subscribersCount || 'N/A'} Subscribers</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="w-6 h-6 mr-2 text-yellow-500" />
                  <span>
                    {newsletterStats?.averageRating.toFixed(1) || 'N/A'}(
                    {newsletterStats?.totalReviews || 0} Reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-6 h-6 mr-2 text-green-500" />
                  <span>{newsletter.frequency}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                {isSubscribed ? (
                  <button
                    onClick={handleUnsubscribe}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    onClick={handleSubscribe}
                    className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Subscribe
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                  <ShareIcon className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                  <BookmarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Reviews Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2 text-primary-500" />
              Reviews
            </h2>

            {/* User Review Input */}
            {user && (
              <div className="mb-6 border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <StarIcon
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= userReview.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                      onClick={() => setUserReview(prev => ({ ...prev, rating: star }))}
                    />
                  ))}
                </div>
                <textarea
                  className="w-full border rounded-lg p-2"
                  placeholder="Share your thoughts about this newsletter"
                  value={userReview.comment}
                  onChange={e => setUserReview(prev => ({ ...prev, comment: e.target.value }))}
                />
                <button
                  onClick={handleSubmitReview}
                  className="mt-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Submit Review
                </button>
              </div>
            )}

            {/* Existing Reviews */}
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{review.userName}</h4>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No reviews yet</p>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Newsletter Details</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold">Author</h3>
                <p>{newsletter.author}</p>
              </div>
              <div>
                <h3 className="font-semibold">Category</h3>
                <p>{newsletter.category}</p>
              </div>
              <div>
                <h3 className="font-semibold">Topics</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newsletter.tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterDetailPage;
