import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useNewsletterSearchStore } from '../newsletterSearchStore';
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'mock-service-worker';

describe('Newsletter Search Store', () => {
  beforeEach(() => {
    // Reset the store state before each test
    server.resetHandlers();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useNewsletterSearchStore());

    expect(result.current.newsletters).toHaveLength(0);
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.isLoading).toBe(false);
  });

  it('should fetch newsletters successfully', async () => {
    const { result } = renderHook(() => useNewsletterSearchStore());

    await act(async () => {
      await result.current.fetchNewsletters();
    });

    expect(result.current.newsletters).toHaveLength(2);
    expect(result.current.total).toBeGreaterThan(0);
    expect(result.current.isLoading).toBe(false);
  });

  it('should set search parameters and trigger fetch', async () => {
    const { result } = renderHook(() => useNewsletterSearchStore());

    await act(async () => {
      result.current.setSearchParams({
        query: 'Tech',
        categories: ['Technology']
      });
    });

    expect(result.current.searchParams.query).toBe('Tech');
    expect(result.current.searchParams.categories).toEqual(['Technology']);
  });

  it('should reset search state', async () => {
    const { result } = renderHook(() => useNewsletterSearchStore());

    // First, fetch some newsletters
    await act(async () => {
      await result.current.fetchNewsletters();
    });

    // Then reset
    await act(async () => {
      result.current.resetSearch();
    });

    expect(result.current.newsletters).toHaveLength(0);
    expect(result.current.total).toBe(0);
    expect(result.current.page).toBe(1);
    expect(result.current.searchParams).toEqual({
      page: 1,
      pageSize: 10
    });
  });

  it('should fetch filter options', async () => {
    const { result } = renderHook(() => useNewsletterSearchStore());

    await act(async () => {
      await result.current.fetchFilterOptions();
    });

    expect(result.current.categories).toContain('Technology');
    expect(result.current.tags).toContain('AI');
    expect(result.current.frequencies).toContain('weekly');
  });

  it('should handle fetch error', async () => {
    // Simulate API error
    server.use(
      http.get('/api/newsletters/search', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useNewsletterSearchStore());

    await act(async () => {
      await result.current.fetchNewsletters();
    });

    expect(result.current.error).not.toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle pagination', async () => {
    const { result } = renderHook(() => useNewsletterSearchStore());

    await act(async () => {
      result.current.setSearchParams({ page: 2, pageSize: 1 });
    });

    expect(result.current.searchParams.page).toBe(2);
    expect(result.current.searchParams.pageSize).toBe(1);
  });
});
