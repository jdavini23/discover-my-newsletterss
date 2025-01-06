import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

import { Newsletter } from '@/stores/newsletterStore';
import { NewsletterService } from '@/services/newsletterService';
import { useAuthStore } from '@/stores/authStore';
import useReadingHistoryStore from '@/stores/readingHistoryStore';
import NewsletterInteractionPanel from '@/components/newsletter/NewsletterInteractionPanel';

import { NewsletterReview } from '@/types';

const NewsletterDetailPage: React.FC = () => {
  const { newsletterId } = useParams<{ newsletterId: string }>();
  const navigate = useNavigate();
  const startTime = useRef(Date.now());

  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [reviews, setReviews] = useState<NewsletterReview[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userReview, setUserReview] = useState<{ rating: number; comment: string }>({
    rating: 0,
    comment: '',
  });

  // Reading history tracking
  const addToHistory = useReadingHistoryStore((state) => state.addToHistory);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchNewsletterDetails = async () => {
      if (!newsletterId) {
        navigate('/newsletters');
        return;
      }

      try {
        const [fetchedNewsletter, fetchedReviews, subscriptionStatus] = await Promise.all([
          NewsletterService.getNewsletterById(newsletterId),
          NewsletterService.getNewsletterReviews(newsletterId),
          NewsletterService.checkSubscriptionStatus(newsletterId),
        ]);

        if (fetchedNewsletter) {
          setNewsletter(fetchedNewsletter);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-gray-600"
        >
          Loading newsletter details...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
    );
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{newsletter?.title}</h1>
          <NewsletterInteractionPanel
            newsletterId={newsletterId}
            isInFavorites={false}
            isFavoriting={false}
            isSubscribed={isSubscribed}
            addToFavorites={() => {}}
            removeFromFavorites={() => {}}
            subscribeNewsletter={handleSubscribe}
            unsubscribeNewsletter={handleUnsubscribe}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={newsletter?.imageUrl}
              alt={newsletter?.title}
              className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
            />
            <p className="text-gray-600 mb-4">{newsletter?.description}</p>
          </div>

          <div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Newsletter Details</h2>
              <div className="space-y-2">
                <p>
                  <strong>Author:</strong> {newsletter?.author}
                </p>
                <p>
                  <strong>Category:</strong> {newsletter?.category}
                </p>
                <p>
                  <strong>Subscribers:</strong> {newsletter?.subscribers.toLocaleString()}
                </p>
                <p>
                  <strong>Rating:</strong> {newsletter?.rating?.toFixed(1) ?? 'N/A'} / 5.0
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {newsletter?.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

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
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= userReview.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => setUserReview((prev) => ({ ...prev, rating: star }))}
                  />
                ))}
              </div>
              <textarea
                className="w-full border rounded-lg p-2"
                placeholder="Share your thoughts about this newsletter"
                value={userReview.comment}
                onChange={(e) => setUserReview((prev) => ({ ...prev, comment: e.target.value }))}
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
              {reviews.map((review) => (
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
    </div>
  );
};

export default NewsletterDetailPage;
