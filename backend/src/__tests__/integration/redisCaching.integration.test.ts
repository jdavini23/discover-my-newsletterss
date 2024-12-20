import Redis from 'ioredis';
import { RedisCache } from '../../utils/redisCache';
import { performance } from 'perf_hooks';

describe('Redis Caching Integration Tests', () => {
  let redisClient: Redis;
  let redisCache: RedisCache;

  beforeAll(async () => {
    // Initialize Redis client
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    });

    redisCache = new RedisCache(redisClient);
  });

  afterAll(async () => {
    // Clear cache and close connection
    await redisClient.flushall();
    await redisClient.quit();
  });

  beforeEach(async () => {
    // Clear cache before each test
    await redisClient.flushall();
  });

  describe('Caching Performance', () => {
    it('should significantly reduce retrieval time for cached data', async () => {
      // Prepare test data
      const key = 'test:performance:key';
      const value = JSON.stringify({ 
        data: 'Large payload to test caching performance',
        complexObject: Array.from({length: 1000}, (_, i) => ({ id: i, value: `item-${i}` }))
      });

      // Simulate expensive data retrieval function
      const expensiveDataRetrieval = async () => {
        // Simulate a slow database or external API call
        await new Promise(resolve => setTimeout(resolve, 100));
        return value;
      };

      // First retrieval (without cache)
      const startFirstRetrieval = performance.now();
      const firstResult = await expensiveDataRetrieval();
      const firstRetrievalTime = performance.now() - startFirstRetrieval;

      // Cache the result
      await redisCache.set(key, firstResult, 3600); // Cache for 1 hour

      // Second retrieval (with cache)
      const startCachedRetrieval = performance.now();
      const cachedResult = await redisCache.get(key, expensiveDataRetrieval);
      const cachedRetrievalTime = performance.now() - startCachedRetrieval;

      // Assertions
      expect(cachedResult).toEqual(firstResult);
      
      // Cached retrieval should be significantly faster
      console.log(`First retrieval time: ${firstRetrievalTime}ms`);
      console.log(`Cached retrieval time: ${cachedRetrievalTime}ms`);
      
      expect(cachedRetrievalTime).toBeLessThan(firstRetrievalTime / 10);
    });
  });

  describe('Caching Functionality', () => {
    it('should correctly cache and retrieve complex objects', async () => {
      // Prepare test data
      const key = 'test:complex:object';
      const complexObject = {
        id: 'user123',
        preferences: {
          newsletters: ['tech', 'science'],
          frequency: 'weekly'
        },
        metadata: {
          createdAt: new Date().toISOString(),
          tags: ['developer', 'researcher']
        }
      };

      // Set cache
      await redisCache.set(key, JSON.stringify(complexObject), 3600);

      // Retrieve from cache
      const retrievedData = await redisCache.get(key);

      // Parse and compare
      expect(JSON.parse(retrievedData!)).toEqual(complexObject);
    });

    it('should return null for expired cache', async () => {
      // Prepare test data
      const key = 'test:expiring:key';
      const value = 'temporary value';

      // Set cache with very short expiration
      await redisCache.set(key, value, 1); // 1 second expiration

      // Wait for cache to expire
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Try to retrieve
      const retrievedValue = await redisCache.get(key);

      // Assert
      expect(retrievedValue).toBeNull();
    });
  });

  describe('Cache Error Handling', () => {
    it('should handle cache retrieval errors gracefully', async () => {
      // Simulate a retrieval function that might fail
      const fallbackDataRetrieval = async () => {
        return JSON.stringify({ fallback: 'data' });
      };

      // Attempt to get non-existent key with fallback
      const result = await redisCache.get('non:existent:key', fallbackDataRetrieval);

      // Assert
      expect(result).toBeTruthy();
    });
  });
});
