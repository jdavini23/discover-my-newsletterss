import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { http, HttpResponse } from 'msw';
import { NewsletterCard } from '../components/common/NewsletterCard';
import { PaginatedNewsletters } from '../types';
import { mockNewsletters } from '../mocks/data';

const NewsletterSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newsletters, setNewsletters] = useState<PaginatedNewsletters | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNewsletters = async (page = 1, query = '') => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/newsletters/search?q=${query}&page=${page}&pageSize=6`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch newsletters');
      }

      const data: PaginatedNewsletters = await response.json();
      setNewsletters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setNewsletters(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Discover Newsletters
      </h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input 
          type="text" 
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search newsletters by topic, title, or tag" 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading newsletters...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 bg-red-50 dark:bg-red-900 rounded-lg">
          <p className="text-xl text-red-600 dark:text-red-300">{error}</p>
          <button 
            onClick={() => fetchNewsletters(currentPage, searchTerm)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search Results */}
      {newsletters && !loading && !error && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {newsletters.total} Newsletter{newsletters.total !== 1 ? 's' : ''} Found
          </h2>
          
          {newsletters.data.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-400 py-12">
              <p className="text-xl">No newsletters found matching your search.</p>
              <p className="mt-4">Try a different search term or explore other categories.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsletters.data.map((newsletter) => (
                  <NewsletterCard 
                    key={newsletter.id}
                    title={newsletter.title}
                    description={newsletter.description}
                    imageUrl={newsletter.imageUrl}
                    tags={newsletter.tags}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="join">
                  {Array.from({ length: newsletters.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
};

const meta: Meta<typeof NewsletterSearchPage> = {
  title: 'Pages/Newsletter Search',
  component: NewsletterSearchPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [
        // Override default handlers for specific stories if needed
      ]
    }
  },
};

export default meta;
type Story = StoryObj<typeof NewsletterSearchPage>;

export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const NoResults: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/newsletters/search', () => {
          return HttpResponse.json({
            data: [],
            total: 0,
            page: 1,
            pageSize: 6,
            totalPages: 0
          });
        })
      ]
    }
  }
};

export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/newsletters/search', () => {
          return HttpResponse.json(
            { 
              code: 'NETWORK_ERROR', 
              message: 'Unable to connect to the server. Please check your internet connection.' 
            }, 
            { status: 500 }
          );
        })
      ]
    }
  }
};

export const PaginatedResults: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/newsletters/search', ({ request }) => {
          const url = new URL(request.url);
          const page = parseInt(url.searchParams.get('page') || '1');
          
          // Simulate different page contents
          const paginatedResponse = {
            data: mockNewsletters.slice((page - 1) * 6, page * 6),
            total: mockNewsletters.length,
            page,
            pageSize: 6,
            totalPages: Math.ceil(mockNewsletters.length / 6)
          };

          return HttpResponse.json(paginatedResponse);
        })
      ]
    }
  }
};
