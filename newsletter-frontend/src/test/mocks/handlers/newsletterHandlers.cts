import { http, HttpResponse } from 'msw';
import { getCurrentConfig } from '../../../config/environment';

const API_URL = getCurrentConfig().API_URL;

console.log('MSW API_URL:', API_URL);

// Sample data
const newsletters = Array.from({ length: 20 }, (_, index) => ({
  id: `newsletter-${index + 1}`,
  title: `Newsletter ${index + 1}`,
  description: `This is a sample newsletter description for newsletter ${index + 1}. It contains interesting content about various topics.`,
  author: `Author ${index + 1}`,
  url: `https://newsletter${index + 1}.example.com`,
  categories: ['Technology', 'Business', 'Productivity', 'Design'].slice(0, (index % 3) + 1),
  frequency: ['daily', 'weekly', 'monthly'][index % 3],
  subscribers: Math.floor(Math.random() * 10000),
  price: {
    amount: index % 3 === 0 ? 0 : (index + 1) * 5,
    currency: '$',
    interval: 'monthly',
  },
  createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - index * 12 * 60 * 60 * 1000).toISOString(),
}));

export const newsletterHandlers = [
  // Search newsletters
  http.get(`${API_URL}/newsletters/search`, ({ request }) => {
    const url = new URL(request.url);
    console.log('MSW Search Request URL:', request.url);
    console.log('MSW Search Params:', Object.fromEntries(url.searchParams.entries()));

    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const query = url.searchParams.get('query') || '';
    const categories = url.searchParams.getAll('categories[]');
    const frequency = url.searchParams.getAll('frequency[]');
    const sortBy = url.searchParams.get('sortBy');

    let filteredNewsletters = [...newsletters];

    // Apply filters
    if (query) {
      const searchQuery = query.toLowerCase();
      filteredNewsletters = filteredNewsletters.filter(
        (newsletter) =>
          newsletter.title.toLowerCase().includes(searchQuery) ||
          newsletter.description.toLowerCase().includes(searchQuery)
      );
    }

    if (categories.length > 0) {
      console.log('MSW Filtering by categories:', categories);
      filteredNewsletters = filteredNewsletters.filter((newsletter) =>
        categories.some((category) => newsletter.categories.includes(category))
      );
      console.log('MSW Filtered newsletters count:', filteredNewsletters.length);
    }

    if (frequency.length > 0) {
      console.log('MSW Filtering by frequency:', frequency);
      filteredNewsletters = filteredNewsletters.filter((newsletter) =>
        frequency.includes(newsletter.frequency)
      );
      console.log('MSW Filtered newsletters count:', filteredNewsletters.length);
    }

    // Apply sorting
    if (sortBy) {
      console.log('MSW Sorting by:', sortBy);
      switch (sortBy) {
        case 'price':
          filteredNewsletters.sort((a, b) => a.price.amount - b.price.amount);
          break;
        case 'subscribers':
          filteredNewsletters.sort((a, b) => b.subscribers - a.subscribers);
          break;
        case 'date':
          filteredNewsletters.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'popularity':
          filteredNewsletters.sort((a, b) => b.subscribers - a.subscribers);
          break;
      }
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNewsletters = filteredNewsletters.slice(startIndex, endIndex);

    const response = {
      newsletters: paginatedNewsletters,
      total: filteredNewsletters.length,
      page,
      totalPages: Math.ceil(filteredNewsletters.length / limit),
    };

    console.log('MSW Response:', response);
    return HttpResponse.json(response);
  }),

  // Get newsletter by ID
  http.get(`${API_URL}/newsletters/:id`, ({ params }) => {
    console.log('MSW Get Newsletter by ID:', params.id);
    const newsletter = newsletters.find((n) => n.id === params.id);

    if (!newsletter) {
      console.log('MSW Newsletter not found');
      return new HttpResponse(null, { status: 404 });
    }

    console.log('MSW Newsletter found:', newsletter);
    return HttpResponse.json(newsletter);
  }),

  // Get recommended newsletters
  http.get(`${API_URL}/newsletters/recommended`, () => {
    console.log('MSW Getting recommended newsletters');
    return HttpResponse.json(newsletters.slice(0, 5));
  }),

  // Get featured newsletters
  http.get(`${API_URL}/newsletters/featured`, () => {
    console.log('MSW Getting featured newsletters');
    return HttpResponse.json(newsletters.slice(5, 10));
  }),

  // Catch-all handler for root path
  http.get('/', () => {
    return HttpResponse.json({ status: 'ok' });
  }),
];
