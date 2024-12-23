import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { newsletterService } from '../newsletterService';
import { server } from '../../test/mocks/server';
import { http, HttpResponse } from 'msw';

describe('Newsletter Service', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should search newsletters successfully', async () => {
    const result = await newsletterService.searchNewsletters({
      query: 'tech',
      page: 1,
      pageSize: 10,
    });

    expect(result).toMatchObject({
      newsletters: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          categories: expect.any(Array),
          frequency: expect.stringMatching(/^(daily|weekly|monthly)$/),
          subscriberCount: expect.any(Number),
        }),
      ]),
      total: expect.any(Number),
      page: expect.any(Number),
      pageSize: expect.any(Number),
      totalPages: expect.any(Number),
    });
  });

  it('should handle pagination parameters', async () => {
    const result = await newsletterService.searchNewsletters({
      query: 'tech',
      page: 2,
      pageSize: 5,
    });

    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(5);
  });

  it('should handle empty search results', async () => {
    server.use(
      http.get('*/newsletters/search', () => {
        return HttpResponse.json({
          newsletters: [],
          total: 0,
          page: 1,
          pageSize: 10,
          totalPages: 0,
        });
      })
    );

    const result = await newsletterService.searchNewsletters({
      query: 'nonexistent',
      page: 1,
      pageSize: 10,
    });

    expect(result).toMatchObject({
      newsletters: [],
      total: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0,
    });
  });
});
