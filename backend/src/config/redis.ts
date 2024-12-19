import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Redis configuration types
interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  retryStrategy: (times: number) => number | null;
}

// Create Redis client with explicit configuration
export const createRedisClient = (config: RedisConfig): Redis => {
  return new Redis({
    host: config.host,
    port: config.port,
    password: config.password,
    retryStrategy: config.retryStrategy,
  });
};

// Enhanced logging for Redis connection
const redisConfig: RedisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    console.warn(`Redis connection retry attempt ${times}, delay: ${delay}ms`);

    // If max retries reached, return null to stop retrying
    if (times > 10) {
      console.warn('Max Redis connection retries reached. Skipping connection.');
      return null;
    }

    return delay;
  },
};

// Singleton Redis client
export const redisClient: Redis = createRedisClient(redisConfig);

// Enhanced error handling
redisClient.on('error', (err) => {
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'integration') {
    console.error('Redis Client Error:', err);
  }
});

redisClient.on('connect', () => {
  console.log('Redis client connected successfully');
});

// Utility functions with explicit return types
export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.ping();
    console.log('Redis connected successfully');
  } catch (_error) {
    console.error('Redis connection error');
    throw new Error('Redis connection failed');
  }
};

export const disconnectRedis = async (): Promise<void> => {
  try {
    await redisClient.quit();
    console.log('Redis disconnected successfully');
  } catch (_error) {
    console.error('Redis disconnection error');
  }
};

export const clearRedisCache = async (): Promise<void> => {
  try {
    await redisClient.flushdb();
    console.log('Redis cache cleared');
  } catch (_error) {
    console.error('Error clearing Redis cache');
  }
};

export const cacheNewsletter = async (
  key: string,
  newsletter: unknown,
  expirySeconds = 3600 // Default 1 hour
): Promise<void> => {
  try {
    await redisClient.set(key, JSON.stringify(newsletter), 'EX', expirySeconds);
    console.log(`Newsletter cached: ${key}, Expiry: ${expirySeconds}s`);
  } catch (_error) {
    console.error('Error caching newsletter');
    throw new Error('Failed to cache newsletter');
  }
};

export const getCachedNewsletter = async (key: string): Promise<unknown | null> => {
  try {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (_error) {
    console.error('Error retrieving cached newsletter');
    throw new Error('Failed to retrieve cached newsletter');
  }
};

export const deleteCachedNewsletter = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
    console.log(`Deleted cached newsletter: ${key}`);
  } catch (_error) {
    console.error('Error deleting cached newsletter');
    throw new Error('Failed to delete cached newsletter');
  }
};

// Graceful shutdown
export const closeRedisConnection = async (): Promise<void> => {
  try {
    await redisClient.quit();
    console.log('Redis connection closed');
  } catch (_error) {
    console.error('Error closing Redis connection');
  }
};
