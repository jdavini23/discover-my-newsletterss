import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../test/setup';
import NewsletterSearch from '../NewsletterSearch';
import { useNewsletterSearchStore } from '../../../stores/newsletterSearchStore';

vi.mock('../../../stores/newsletterSearchStore', () => ({
  useNewsletterSearchStore: vi.fn(),
}));

const mockUseNewsletterSearchStore = useNewsletterSearchStore as unknown as ReturnType<typeof vi.fn>;

describe('NewsletterSearch Component', () => {
  const mockStore = {
    newsletters: [],
    loading: false,
    error: null,
    categories: ['Technology', 'Finance', 'Health'],
    fetchNewsletters: vi.fn(),
    fetchFilterOptions: vi.fn(),
    setSearchParams: vi.fn(),
    resetSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseNewsletterSearchStore.mockImplementation(() => mockStore);
  });

  it('renders search input and buttons', () => {
    render(<NewsletterSearch />);
    expect(screen.getByPlaceholderText('Search newsletters...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('displays newsletters when available', () => {
    const mockNewsletters = [
      {
        id: '1',
        title: 'Tech Weekly',
        description: 'Latest in technology',
        categories: ['Technology'],
        frequency: 'Weekly',
        subscriberCount: 1000,
        url: 'https://techweekly.com',
      },
    ];

    mockUseNewsletterSearchStore.mockImplementation(() => ({
      ...mockStore,
      newsletters: mockNewsletters,
    }));

    render(<NewsletterSearch />);
    expect(screen.getByText('Tech Weekly')).toBeInTheDocument();
    expect(screen.getByText('Latest in technology')).toBeInTheDocument();
  });

  it('calls fetchNewsletters and fetchFilterOptions on initial render', () => {
    render(<NewsletterSearch />);
    expect(mockStore.fetchNewsletters).toHaveBeenCalled();
    expect(mockStore.fetchFilterOptions).toHaveBeenCalled();
  });

  it('allows searching newsletters', async () => {
    render(<NewsletterSearch />);
    const searchInput = screen.getByPlaceholderText('Search newsletters...');
    fireEvent.change(searchInput, { target: { value: 'tech' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(mockStore.setSearchParams).toHaveBeenCalledWith({
        query: 'tech',
        categories: undefined,
        page: 1,
      });
      expect(mockStore.fetchNewsletters).toHaveBeenCalled();
    });
  });

  it('allows filtering by category', async () => {
    render(<NewsletterSearch />);
    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'Technology' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(mockStore.setSearchParams).toHaveBeenCalledWith({
        query: '',
        categories: ['Technology'],
        page: 1,
      });
      expect(mockStore.fetchNewsletters).toHaveBeenCalled();
    });
  });

  it('handles reset functionality', async () => {
    render(<NewsletterSearch />);
    fireEvent.click(screen.getByText('Reset'));

    await waitFor(() => {
      expect(mockStore.resetSearch).toHaveBeenCalled();
      expect(mockStore.fetchNewsletters).toHaveBeenCalled();
    });
  });

  it('displays loading spinner when loading', () => {
    mockUseNewsletterSearchStore.mockImplementation(() => ({
      ...mockStore,
      loading: true,
    }));

    render(<NewsletterSearch />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when error occurs', () => {
    mockUseNewsletterSearchStore.mockImplementation(() => ({
      ...mockStore,
      error: 'Failed to fetch newsletters',
    }));

    render(<NewsletterSearch />);
    expect(screen.getByText('Failed to fetch newsletters')).toBeInTheDocument();
  });
});
