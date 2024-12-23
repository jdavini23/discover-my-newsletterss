import React from 'react';
import type { NewsletterSearchFilters } from '../../types/newsletter';

interface Props {
  filters: NewsletterSearchFilters;
  onFilterChange: (filters: Partial<NewsletterSearchFilters>) => void;
}

const CATEGORIES = [
  'Technology',
  'Business',
  'Finance',
  'Marketing',
  'Design',
  'Development',
  'Productivity',
  'Personal Growth',
];

const FREQUENCIES = ['daily', 'weekly', 'monthly'] as const;

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price', label: 'Price (Low to High)' },
  { value: 'date', label: 'Newest First' },
  { value: 'subscribers', label: 'Most Subscribers' },
] as const;

export const SearchFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ query: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories?.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...(filters.categories || []), category];
    onFilterChange({ categories: newCategories });
  };

  const handleFrequencyChange = (frequency: (typeof FREQUENCIES)[number]) => {
    const newFrequencies = filters.frequency?.includes(frequency)
      ? filters.frequency.filter((f) => f !== frequency)
      : [...(filters.frequency || []), frequency];
    onFilterChange({ frequency: newFrequencies });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sortBy: e.target.value as NewsletterSearchFilters['sortBy'] });
  };

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow">
      <div>
        <input
          type="text"
          value={filters.query || ''}
          onChange={handleQueryChange}
          placeholder="Search newsletters..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <h3 className="mb-2 font-medium">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full px-3 py-1 text-sm ${
                filters.categories?.includes(category)
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Frequency</h3>
        <div className="flex gap-4">
          {FREQUENCIES.map((frequency) => (
            <label key={frequency} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.frequency?.includes(frequency) || false}
                onChange={() => handleFrequencyChange(frequency)}
                className="mr-2"
              />
              {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Sort By</h3>
        <select
          value={filters.sortBy || 'popularity'}
          onChange={handleSortChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
