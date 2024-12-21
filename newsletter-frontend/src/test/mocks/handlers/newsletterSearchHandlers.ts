import { http, HttpResponse } from 'msw';

export const newsletterSearchHandlers = [
  http.get('*/newsletters/search', async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    return HttpResponse.json({
      newsletters: [
        {
          id: "1",
          title: "Tech Weekly",
          description: "Latest in technology",
          categories: ["tech", "software"],
          frequency: "weekly",
          subscriberCount: 1000,
        },
        {
          id: "2",
          title: "Tech Daily",
          description: "Daily tech updates",
          categories: ["tech", "news"],
          frequency: "daily",
          subscriberCount: 5000,
        }
      ],
      total: 2,
      page,
      pageSize,
      totalPages: 1
    });
  })
];        }
      ];

      const newsletter = newsletters.find(nl => nl.id === id);

      if (newsletter) {
        return HttpResponse.json(newsletter);
      }

      return HttpResponse.json({ error: 'Newsletter not found' }, { status: 404 });
    } catch (error) {
      console.error('Error in newsletter details handler:', error);
      return HttpResponse.json({
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error occurred' 
      }, { status: 500 });
    }
  })
];
