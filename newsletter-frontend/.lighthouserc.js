module.exports = {
  ci: {
    collect: {
      url: [
        'https://newsletter-frontend.vercel.app',
        'https://newsletter-frontend.vercel.app/search',
        'https://newsletter-frontend.vercel.app/login',
      ],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Performance budgets
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'speed-index': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        interactive: ['error', { maxNumericValue: 3500 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],

        // Resource size limits
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 200 * 1024 }],
        'resource-summary:script:size': ['error', { maxNumericValue: 250 * 1024 }],

        // Network requests
        'network-requests': ['error', { maxNumericValue: 50 }],
        'network-rtt': ['error', { maxNumericValue: 100 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
