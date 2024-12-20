import { performance } from 'perf_hooks';
import { RecommendationController } from '../controllers/recommendationController';
import { redisClient } from '../config/redis';

async function benchmarkRecommendations() {
  const controller = new RecommendationController();
  const mockUser = { id: 'benchmark-user', email: 'benchmark@test.com' };

  const scenarios = [
    {
      name: 'Cold Cache Recommendation Fetch',
      run: async () => {
        // Clear Redis cache before test
        await redisClient.del(`recommendations:newsletters:${mockUser.id}:page:1:limit:10`);
        
        const start = performance.now();
        await controller._getPersonalizedRecommendations(
          { 
            user: mockUser, 
            query: { page: 1, limit: 10 } 
          } as any, 
          { 
            json: () => {},
            status: () => ({ json: () => {} })
          } as any, 
          () => {}
        );
        const end = performance.now();
        return end - start;
      }
    },
    {
      name: 'Warm Cache Recommendation Fetch',
      run: async () => {
        const start = performance.now();
        await controller._getPersonalizedRecommendations(
          { 
            user: mockUser, 
            query: { page: 1, limit: 10 } 
          } as any, 
          { 
            json: () => {},
            status: () => ({ json: () => {} })
          } as any, 
          () => {}
        );
        const end = performance.now();
        return end - start;
      }
    }
  ];

  console.log('Performance Benchmark for Newsletter Recommendations');
  for (const scenario of scenarios) {
    const duration = await scenario.run();
    console.log(`${scenario.name}: ${duration.toFixed(2)}ms`);
  }

  // Close Redis connection
  await redisClient.quit();
}

benchmarkRecommendations().catch(console.error);
