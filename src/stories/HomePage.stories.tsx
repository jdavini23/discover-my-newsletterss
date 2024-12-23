import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NewsletterCard } from '../components/common/NewsletterCard';
import { mockNewsletters } from '../mocks/data';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Discover Your Perfect Newsletters
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Curate your knowledge. Stay informed with personalized newsletter recommendations.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Search newsletters by topic or interest" 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Featured Newsletters */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Featured Newsletters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNewsletters.map((newsletter) => (
            <NewsletterCard 
              key={newsletter.id}
              title={newsletter.title}
              description={newsletter.description}
              imageUrl={newsletter.imageUrl}
              tags={newsletter.tags}
            />
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Popular Categories
        </h2>
        <div className="flex flex-wrap gap-4">
          {['Technology', 'AI', 'Climate Tech', 'Startups', 'Science', 'Design'].map((category) => (
            <button 
              key={category} 
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof HomePage> = {
  title: 'Pages/Home',
  component: HomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
