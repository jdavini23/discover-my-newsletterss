import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NewsletterSearch } from '../NewsletterSearch';
import { ChakraProvider } from '@chakra-ui/react';
import { useNewsletterSearchStore } from '@/stores/newsletterSearchStore';

// Mock the Zustand store
vi.mock('@/stores/newsletterSearchStore', () => ({
  useNewsletterSearchStore: vi.fn(),
}));

const mockNewsletters = [
  {
    id: '1',
    title: 'Tech Insider',
    description: 'Latest trends in technology',
    categories: ['Technology'],
    frequency: 'weekly',
    subscriberCount: 5000,
  },
  {
    id: '2',
    title: 'Business Horizons',
    description: 'Insights for entrepreneurs',
    categories: ['Business'],
    frequency: 'monthly',
    subscriberCount: 3500,
  },
];

const mockStoreState = {
  newsletters: mockNewsletters,
  categories: ['Technology', 'Business', 'Science'],
  tags: ['AI', 'Innovation', 'Startups'],
  frequencies: ['daily', 'weekly', 'monthly'],
  isLoading: false,
  error: null,
  fetchNewsletters: vi.fn(),
  setSearchParams: vi.fn(),
  fetchFilterOptions: vi.fn(),
  resetSearch: vi.fn(),
};

const renderComponent = () => {
  (useNewsletterSearchStore as any).mockReturnValue(mockStoreState);

  return render(
    <ChakraProvider>
      <NewsletterSearch />
    </ChakraProvider>
  );
};

describe('NewsletterSearch Component', () => {
  it('renders search input and buttons', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Search newsletters...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('displays newsletters when available', () => {
    renderComponent();

    expect(screen.getByText('Tech Insider')).toBeInTheDocument();
    expect(screen.getByText('Business Horizons')).toBeInTheDocument();
  });

  it('calls fetchNewsletters and fetchFilterOptions on initial render', () => {
    renderComponent();

    expect(mockStoreState.fetchNewsletters).toHaveBeenCalled();
    expect(mockStoreState.fetchFilterOptions).toHaveBeenCalled();
  });

  it('allows searching newsletters', async () => {
    const user = userEvent.setup();
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Search newsletters...');
    const searchButton = screen.getByText('Search');

    await user.type(searchInput, 'Tech');
    await user.click(searchButton);

    expect(mockStoreState.setSearchParams).toHaveBeenCalledWith({
      query: 'Tech',
      categories: undefined,
      tags: undefined,
      frequency: undefined,
    });
  });

  it('allows filtering by category', async () => {
    const user = userEvent.setup();
    renderComponent();

    const categorySelect = screen.getByText('Select Category').closest('select');

    if (categorySelect) {
      await user.selectOptions(categorySelect, 'Technology');
      const searchButton = screen.getByText('Search');
      await user.click(searchButton);

      expect(mockStoreState.setSearchParams).toHaveBeenCalledWith({
        query: undefined,
        categories: ['Technology'],
        tags: undefined,
        frequency: undefined,
      });
    }
  });

  it('handles reset functionality', async () => {
    const user = userEvent.setup();
    renderComponent();

    const resetButton = screen.getByText('Reset');
    await user.click(resetButton);

    expect(mockStoreState.resetSearch).toHaveBeenCalled();
  });

  it('displays loading spinner when loading', () => {
    (useNewsletterSearchStore as any).mockReturnValue({
      ...mockStoreState,
      isLoading: true,
    });

    renderComponent();

    expect(screen.getByRole('status')).toBeInTheDocument(); // Chakra UI spinner
  });

  it('displays error message when error occurs', () => {
    (useNewsletterSearchStore as any).mockReturnValue({
      ...mockStoreState,
      error: 'Something went wrong',
    });

    renderComponent();

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
