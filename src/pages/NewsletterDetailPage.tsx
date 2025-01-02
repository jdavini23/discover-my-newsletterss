import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Newsletter } from '@/stores/newsletterStore';
import { NewsletterService } from '@/services/newsletterService';
import { trackEvent } from '@/utils/analytics';
import NewsletterInteractionPanel from '@/components/newsletter/NewsletterInteractionPanel';
import { motion } from 'framer-motion';

const NewsletterDetailPage: React.FC = () => {
  const { newsletterId } = useParams<{ newsletterId: string }>();
  const navigate = useNavigate();
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsletterDetails = async () => {
      if (!newsletterId) {
        setError('No newsletter ID provided');
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching newsletter details for ID: ${newsletterId}`);
        const fetchedNewsletter = await NewsletterService.fetchNewsletterById(newsletterId);

        if (fetchedNewsletter) {
          setNewsletter(fetchedNewsletter);
          trackEvent('newsletter_detail_view', { newsletterId });
        } else {
          setError(`No newsletter found with ID: ${newsletterId}`);
          navigate('/newsletters');
        }
      } catch (err) {
        setError('Failed to fetch newsletter details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletterDetails();
  }, [newsletterId, navigate]);

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

  if (!newsletter) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{newsletter.title}</h1>
          <NewsletterInteractionPanel
            newsletterId={newsletter.id}
            isInFavorites={false}
            isFavoriting={false}
            isSubscribed={false}
            addToFavorites={() => {}}
            removeFromFavorites={() => {}}
            subscribeNewsletter={() => {}}
            unsubscribeNewsletter={() => {}}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={newsletter.imageUrl}
              alt={newsletter.title}
              className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
            />
            <p className="text-gray-600 mb-4">{newsletter.description}</p>
          </div>

          <div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Newsletter Details</h2>
              <div className="space-y-2">
                <p>
                  <strong>Author:</strong> {newsletter.author}
                </p>
                <p>
                  <strong>Category:</strong> {newsletter.category}
                </p>
                <p>
                  <strong>Subscribers:</strong> {newsletter.subscribers.toLocaleString()}
                </p>
                <p>
                  <strong>Rating:</strong> {newsletter.rating?.toFixed(1) ?? 'N/A'} / 5.0
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {newsletter.tags.map(tag => (
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
      </div>
    </div>
  );
};

export default NewsletterDetailPage;
