import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from '@vitest/core';
import { useNewsletterSearchStore } from '../newsletterSearchStore';

const mockNewsletters = [
  {
    id: '1',
    title: 'Tech Insider',
    description: 'Latest trends in technology',
    categories: ['Technology'],
    frequency: 'weekly',
    subscriberCount: 5000,
    url: 'https://example.com/tech-insider',
  },
  {
    id: '2',
    title: 'Finance Weekly',
    description: 'Financial news and analysis',
    categories: ['Finance'],
    frequency: 'weekly',
    subscriberCount: 3000,
    url: 'https://example.com/finance-weekly',
  },
];

const mockFilterOptions = {
  categories: ['Technology', 'Finance', 'Health'],
  tags: ['Investment', 'Startup', 'AI'],
  frequencies: ['Weekly', 'Monthly', 'Quarterly']
};

describe('Newsletter Search Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    const store = useNewsletterSearchStore.getState();
    store.resetSearch();

    // Reset global fetch mock
    global.fetch = vi.fn();
  });

  it('should initialize with default state', () => {
    const store = useNewsletterSearchStore.getState();
    expect(store.newsletters).toEqual([]);
    expect(store.currentPage).toBe(1);
    expect(store.pageSize).toBe(10);
    expect(store.searchParams).toEqual({
      page: 1,
      pageSize: 10,
    });
    expect(store.error).toBeNull();
  });

  it('should search newsletters successfully', async () => {
    const mockResponse = {
      newsletters: mockNewsletters.slice(0, 1),
      page: 1,
      pageSize: 10,
      total: 1,
    };

    (global.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const store = useNewsletterSearchStore.getState();
    await store.fetchNewsletters();

    expect(store.newsletters).toEqual(mockNewsletters.slice(0, 1));
    expect(store.currentPage).toBe(1);
    expect(store.pageSize).toBe(10);
  });

  it('should handle pagination parameters', async () => {
    const mockResponse = {
      newsletters: mockNewsletters.slice(0, 1),
      page: 2,
      pageSize: 20,
      total: 2,
    };

    (global.fetch as vi.Mock).mockResolvedValueOnce({
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

    (global.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const store = useNewsletterSearchStore.getState();
    await store.fetchNewsletters();

    expect(store.newsletters).toEqual([]);
    expect(store.total).toBe(0);
  });

  it('should handle fetch error', async () => {
    (global.fetch as vi.Mock).mockRejectedValueOnce(new Error('Network error'));

    const store = useNewsletterSearchStore.getState();
    await store.fetchNewsletters();

    expect(store.error).toBe('Network error');
    expect(store.newsletters).toEqual([]);
  });

  it('should set search parameters', () => {
    const store = useNewsletterSearchStore.getState();
    const params = {
      query: 'Tech',
      categories: ['Technology'],
      page: 1,
      pageSize: 10
    };

    store.setSearchParams(params);

    expect(store.searchParams.query).toBe('Tech');
    expect(store.searchParams.categories).toEqual(['Technology']);
    expect(store.searchParams.page).toBe(1);
  });

  it('should reset search state', () => {
    const store = useNewsletterSearchStore.getState();
    store.setSearchParams({ query: 'Test', page: 2 });
    store.resetSearch();

    expect(store.searchParams).toEqual({
      page: 1,
      pageSize: 10,
    });
    expect(store.newsletters).toEqual([]);
  });

  it('should fetch filter options', async () => {
    const mockResponse = {
      categories: ['Technology', 'Finance', 'Health'],
      tags: ['Investment', 'Startup', 'AI'],
      frequencies: ['Weekly', 'Monthly', 'Quarterly']
    };

    (global.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
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
