import { http, HttpResponse } from 'msw';

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

export const newsletterHandlers = [
  http.get('/api/newsletters/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    const filteredNewsletters = mockNewsletters.filter(
      (newsletter) =>
        newsletter.title.toLowerCase().includes(query.toLowerCase()) ||
        newsletter.description.toLowerCase().includes(query.toLowerCase())
    );

    return HttpResponse.json({
      newsletters: filteredNewsletters.slice((page - 1) * pageSize, page * pageSize),
      total: filteredNewsletters.length,
      page,
      pageSize,
    });
  }),

  http.get('/api/newsletters/:id', ({ params }) => {
    const { id } = params;
    const newsletter = mockNewsletters.find((n) => n.id === id);

    if (!newsletter) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(newsletter);
  }),

  http.post('/api/newsletters/:id/subscribe', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.post('/api/newsletters/:id/unsubscribe', () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
