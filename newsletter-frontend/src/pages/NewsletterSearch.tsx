import React, { useState } from 'react';
import { useNewsletters } from '../hooks/useNewsletters';
import type { NewsletterSearchFilters } from '../types/newsletter';
import { NewsletterCard } from '../components/newsletter/NewsletterCard';
import { SearchFilters } from '../components/newsletter/SearchFilters';
import { Pagination } from '../components/common/Pagination';

const NewsletterSearch: React.FC = () => {
  const [filters, setFilters] = useState<NewsletterSearchFilters>({
    page: 1,
    limit: 10,
    categories: [],
    frequency: [],
    sortBy: 'popularity',
  });

  const { search } = useNewsletters();
  const { data, isLoading, error } = search(filters);

  const handleFilterChange = (newFilters: Partial<NewsletterSearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  if (error) {
    return (
      <div className="p-4 text-red-600">Error loading newsletters. Please try again later.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Discover Newsletters</h1>

      <SearchFilters filters={filters} onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      ) : (
        <>
          <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.newsletters?.map((newsletter) => (
              <NewsletterCard key={newsletter.id} newsletter={newsletter} />
            )) || (
              <div className="col-span-full py-8 text-center text-gray-500">
                No newsletters found.
              </div>
            )}
          </div>

          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              currentPage={data.page}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NewsletterSearch;
