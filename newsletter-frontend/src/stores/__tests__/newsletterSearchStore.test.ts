import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useNewsletterSearchStore } from '../newsletterSearchStore';

const mockNewsletters = [{
  id: '1',
  title: 'Tech Weekly',
  description: 'Latest in technology',
  url: 'https://techweekly.com',
  categories: ['Technology'],
  frequency: 'Weekly',
  subscriberCount: 1000,
}];

const mockFilterOptions = {
  categories: ['Technology', 'Finance', 'Health'],
  tags: ['AI', 'Crypto', 'Health'],
  frequencies: ['Daily', 'Weekly', 'Monthly'],
};

describe('Newsletter Search Store', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    const store = useNewsletterSearchStore.getState();
    store.resetSearch();
  });

  it('should initialize with default state', () => {
    const store = useNewsletterSearchStore.getState();
    expect(store.newsletters).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('should search newsletters successfully', async () => {
    const mockResponse = {
      newsletters: mockNewsletters,
      page: 1,
      pageSize: 10,
      total: 1,
    };

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const store = useNewsletterSearchStore.getState();
    await store.fetchNewsletters();

    expect(store.newsletters).toEqual(mockNewsletters);
    expect(store.currentPage).toBe(1);
    expect(store.pageSize).toBe(10);
  });

  it('should handle pagination parameters', async () => {
    const mockResponse = {
      newsletters: mockNewsletters,
      page: 2,
      pageSize: 20,
      total: 1,
    };

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const store = useNewsletterSearchStore.getState();
    await store.fetchNewsletters({ page: 2, pageSize: 20 });

    expect(store.currentPage).toBe(2);
    expect(store.pageSize).toBe(20);
  });

  it('should handle empty search results', async () => {
    const mockResponse = {
      newsletters: [],
      page: 1,
      pageSize: 10,
      total: 0,
    };

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const store = useNewsletterSearchStore.getState();
    await store.fetchNewsletters();

    expect(store.newsletters).toEqual([]);
    expect(store.total).toBe(0);
  });

  it('should handle fetch error', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    const store = useNewsletterSearchStore.getState();
    await store.fetchNewsletters();

    expect(store.error).toBe('Network error');
    expect(store.newsletters).toEqual([]);
  });

  it('should set search parameters', () => {
    const params = {
      query: 'Tech',
      categories: ['Technology'],
    };

    const store = useNewsletterSearchStore.getState();
    store.setSearchParams(params);

    expect(store.searchParams.query).toBe('Tech');
    expect(store.searchParams.categories).toEqual(['Technology']);
  });

  it('should reset search state', () => {
    const store = useNewsletterSearchStore.getState();
    store.setSearchParams({
      query: 'Tech',
      categories: ['Technology'],
    });
    store.resetSearch();

    expect(store.newsletters).toEqual([]);
    expect(store.error).toBeNull();
    expect(store.searchParams).toEqual({
      page: 1,
      pageSize: 10,
    });
  });

  it('should fetch filter options', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockFilterOptions),
    });

    const store = useNewsletterSearchStore.getState();
    await store.fetchFilterOptions();

    expect(store.categories).toEqual(mockFilterOptions.categories);
    expect(store.tags).toEqual(mockFilterOptions.tags);
    expect(store.frequencies).toEqual(mockFilterOptions.frequencies);
  });

  it('should handle pagination', () => {
    const store = useNewsletterSearchStore.getState();
    store.setSearchParams({ page: 2, pageSize: 1 });

    expect(store.searchParams.page).toBe(2);
    expect(store.searchParams.pageSize).toBe(1);
  });
});
