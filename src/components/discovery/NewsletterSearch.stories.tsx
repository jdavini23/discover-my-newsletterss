import React, { useState } from 'react';
import { NewsletterSearch } from './NewsletterSearch';

/**
 * NewsletterSearch component for finding newsletters
 *
 * @component
 * @example
 * // Basic usage
 * <NewsletterSearch
 *   onSearch={(query) => handleSearch(query)}
 * />
 */
export const DefaultNewsletterSearch = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query: string) => {
    console.log('Searching for:', query);
    // Simulated search results
    const mockResults = [
      { id: 1, title: 'Tech Weekly', description: 'Latest tech news' },
      { id: 2, title: 'Science Digest', description: 'Scientific discoveries' },
    ];
    setSearchResults(mockResults);
  };

  return <NewsletterSearch onSearch={handleSearch} results={searchResults} />;
};

export const PopulatedNewsletterSearch = () => {
  const [searchResults, setSearchResults] = useState([
    { id: 1, title: 'Tech Weekly', description: 'Latest tech news' },
    { id: 2, title: 'Science Digest', description: 'Scientific discoveries' },
    { id: 3, title: 'Business Insider', description: 'Global business trends' },
  ]);

  const handleSearch = async (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <NewsletterSearch onSearch={handleSearch} results={searchResults} initialQuery="Technology" />
  );
};

export const EmptyNewsletterSearch = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query: string) => {
    console.log('Searching for:', query);
    // Simulate no results
    setSearchResults([]);
  };

  return (
    <NewsletterSearch
      onSearch={handleSearch}
      results={searchResults}
      initialQuery="Nonexistent Topic"
    />
  );
};

DefaultNewsletterSearch.ladle = {
  name: 'Default Newsletter Search',
  description: 'Newsletter search component with no initial results',
};

PopulatedNewsletterSearch.ladle = {
  name: 'Populated Newsletter Search',
  description: 'Newsletter search with predefined results',
};

EmptyNewsletterSearch.ladle = {
  name: 'Empty Newsletter Search',
  description: 'Newsletter search with no results',
};
