import React from 'react';
import { Link } from 'react-router-dom';
import type { Newsletter } from '../../types/newsletter';
import { useUserPreferences } from '../../hooks/useUserPreferences';

interface Props {
  newsletter: Newsletter;
}

export const NewsletterCard: React.FC<Props> = ({ newsletter }) => {
  const { preferences, addFavorite, removeFavorite } = useUserPreferences();
  const isFavorite = preferences.data?.favoriteNewsletters?.includes(newsletter.id) ?? false;

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await removeFavorite.mutateAsync(newsletter.id);
      } else {
        await addFavorite.mutateAsync(newsletter.id);
      }
    } catch (error) {
      console.error('Failed to update favorite status:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold mb-2">
            <Link
              to={`/newsletter/${newsletter.id}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {newsletter.title}
            </Link>
          </h2>
          <button
            onClick={handleFavoriteClick}
            disabled={preferences.isLoading || addFavorite.isPending || removeFavorite.isPending}
            className={`text-2xl ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400'
            } hover:scale-110 transition-transform ${
              (preferences.isLoading || addFavorite.isPending || removeFavorite.isPending) 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            ★
          </button>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{newsletter.description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-4">By {newsletter.author}</span>
          <span className="capitalize">{newsletter.frequency}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {newsletter.categories.map(category => (
              <span
                key={category}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
              >
                {category}
              </span>
            ))}
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">
              {newsletter.price.amount === 0 ? (
                'Free'
              ) : (
                `${newsletter.price.currency}${newsletter.price.amount}/${
                  newsletter.price.interval || 'month'
                }`
              )}
            </div>
            <div className="text-sm text-gray-500">
              {newsletter.subscribers.toLocaleString()} subscribers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
