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
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h2 className="mb-2 text-xl font-semibold">
            <Link
              to={`/newsletter/${newsletter.id}`}
              className="transition-colors hover:text-indigo-600"
            >
              {newsletter.title}
            </Link>
          </h2>
          <button
            onClick={handleFavoriteClick}
            disabled={preferences.isLoading || addFavorite.isPending || removeFavorite.isPending}
            className={`text-2xl ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400'
            } transition-transform hover:scale-110 ${
              preferences.isLoading || addFavorite.isPending || removeFavorite.isPending
                ? 'cursor-not-allowed opacity-50'
                : ''
            }`}
          >
            ★
          </button>
        </div>

        <p className="mb-4 line-clamp-2 text-gray-600">{newsletter.description}</p>

        <div className="mb-4 flex items-center text-sm text-gray-500">
          <span className="mr-4">By {newsletter.author}</span>
          <span className="capitalize">{newsletter.frequency}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {newsletter.categories.map((category) => (
              <span key={category} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                {category}
              </span>
            ))}
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">
              {newsletter.price.amount === 0
                ? 'Free'
                : `${newsletter.price.currency}${newsletter.price.amount}/${
                    newsletter.price.interval || 'month'
                  }`}
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
