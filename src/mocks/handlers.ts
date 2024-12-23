import { http, HttpResponse, delay } from 'msw';
import { 
  mockNewsletters, 
  mockUser, 
  mockApiErrors,
  categories,
  tags
} from './data';
import { 
  SearchParams, 
  UserPreferencesUpdate, 
  PaginatedNewsletters,
  ApiError,
  Newsletter
} from '../types';

// Utility function for paginated search
function paginateResults(
  items: Newsletter[], 
  page: number = 1, 
  pageSize: number = 5
): PaginatedNewsletters {
  const startIndex = (page - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  
  return {
    data: paginatedItems,
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize)
  };
}

export const handlers = [
  // Paginated Newsletter Search with Advanced Filtering
  http.get('/api/newsletters/search', async ({ request }) => {
    const url = new URL(request.url);
    const params: SearchParams = {
      query: url.searchParams.get('q') || undefined,
      categories: url.searchParams.getAll('categories'),
      tags: url.searchParams.getAll('tags'),
      sortBy: url.searchParams.get('sortBy') as 'subscribers' | 'recent' | undefined,
      page: parseInt(url.searchParams.get('page') || '1'),
      pageSize: parseInt(url.searchParams.get('pageSize') || '5')
    };

    // Simulate network delay
    await delay(500);

    // Filter newsletters based on search parameters
    let filteredNewsletters = mockNewsletters.filter(newsletter => {
      // Query filter
      const matchesQuery = !params.query || 
        newsletter.title.toLowerCase().includes(params.query.toLowerCase()) ||
        newsletter.description.toLowerCase().includes(params.query.toLowerCase());
      
      // Categories filter
      const matchesCategories = !params.categories?.length || 
        params.categories.some(cat => newsletter.categories.includes(cat));
      
      // Tags filter
      const matchesTags = !params.tags?.length || 
        params.tags.some(tag => newsletter.tags.includes(tag));
      
      return matchesQuery && matchesCategories && matchesTags;
    });

    // Sort results
    switch (params.sortBy) {
      case 'subscribers':
        filteredNewsletters.sort((a, b) => b.subscriberCount - a.subscriberCount);
        break;
      case 'recent':
        // Assuming we'd have a date field in a real scenario
        break;
    }

    // Paginate results
    const paginatedResults = paginateResults(
      filteredNewsletters, 
      params.page, 
      params.pageSize
    );

    // Simulate different response scenarios
    if (paginatedResults.total === 0) {
      return HttpResponse.json<ApiError>(mockApiErrors.notFound, { status: 404 });
    }

    return HttpResponse.json<PaginatedNewsletters>(paginatedResults);
  }),

  // Get User Preferences
  http.get('/api/user/preferences', () => {
    return HttpResponse.json(mockUser.preferences);
  }),

  // Update User Preferences
  http.post('/api/user/preferences', async ({ request }) => {
    try {
      const updates: UserPreferencesUpdate = await request.json();
      
      // Validate and update user preferences
      const updatedPreferences = {
        ...mockUser.preferences,
        ...updates
      };

      return HttpResponse.json(updatedPreferences);
    } catch (error) {
      return HttpResponse.json<ApiError>(
        { code: 'BAD_REQUEST', message: 'Invalid preferences update' }, 
        { status: 400 }
      );
    }
  }),

  // Get Available Categories
  http.get('/api/categories', () => {
    return HttpResponse.json(categories);
  }),

  // Get Available Tags
  http.get('/api/tags', () => {
    return HttpResponse.json(tags);
  }),

  // Simulate error scenarios
  http.get('/api/error/network', () => {
    return HttpResponse.json(mockApiErrors.networkError, { status: 500 });
  }),

  http.get('/api/error/unauthorized', () => {
    return HttpResponse.json(mockApiErrors.unauthorized, { status: 401 });
  })
];
