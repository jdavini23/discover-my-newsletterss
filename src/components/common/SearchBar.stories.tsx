import React from 'react';
import { SearchBar } from './SearchBar';

export const DefaultSearchBar = () => (
  <SearchBar
    placeholder="Search newsletters..."
    onSearch={query => console.log('Search query:', query)}
  />
);

export const PrefilledSearchBar = () => (
  <SearchBar
    placeholder="Search newsletters..."
    initialValue="React"
    onSearch={query => console.log('Search query:', query)}
  />
);

export const DisabledSearchBar = () => (
  <SearchBar
    placeholder="Search newsletters..."
    disabled
    onSearch={query => console.log('Search query:', query)}
  />
);

DefaultSearchBar.ladle = {
  name: 'Default Search Bar',
  description: 'Standard search bar with placeholder',
};

PrefilledSearchBar.ladle = {
  name: 'Prefilled Search Bar',
  description: 'Search bar with initial value',
};

DisabledSearchBar.ladle = {
  name: 'Disabled Search Bar',
  description: 'Search bar in disabled state',
};
