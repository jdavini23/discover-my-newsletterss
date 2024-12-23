import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { NewsletterCard } from '../components/common/NewsletterCard';
import { mockNewsletters } from '../mocks/data';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(
    mockNewsletters.filter(newsletter => newsletter.isFavorite)
  );

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(newsletter => newsletter.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Favorite Newsletters
        </h1>
        <div className="text-gray-600 dark:text-gray-300">
          {favorites.length} Newsletters
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            No Favorite Newsletters Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start exploring and add newsletters to your favorites!
          </p>
          <button 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Explore Newsletters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((newsletter) => (
            <div key={newsletter.id} className="relative group">
              <NewsletterCard 
                title={newsletter.title}
                description={newsletter.description}
                imageUrl={newsletter.imageUrl}
                tags={newsletter.tags}
                onFavorite={() => removeFavorite(newsletter.id)}
              />
              <button 
                onClick={() => removeFavorite(newsletter.id)}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove from Favorites"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-8 text-center">
          <button 
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Manage Subscriptions
          </button>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof FavoritesPage> = {
  title: 'Pages/Favorites',
  component: FavoritesPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FavoritesPage>;

export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const EmptyState: Story = {
  render: () => {
    const [favorites, setFavorites] = useState<any[]>([]);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Favorite Newsletters
          </h1>
          <div className="text-gray-600 dark:text-gray-300">
            {favorites.length} Newsletters
          </div>
        </div>

        <div className="text-center py-16">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            No Favorite Newsletters Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start exploring and add newsletters to your favorites!
          </p>
          <button 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Explore Newsletters
          </button>
        </div>
      </div>
    );
  },
};
