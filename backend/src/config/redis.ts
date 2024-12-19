import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Enhanced logging for Redis connection
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    console.warn(`Redis connection retry attempt ${times}, delay: ${delay}ms`);
    
    // If max retries reached, return null to stop retrying
    if (times > 10) {
      console.warn('Max Redis connection retries reached. Skipping connection.');
      return null;
    }
    
    return delay;
  }
};

// Enhanced error handling
export const redisClient = new Redis(redisConfig);

redisClient.on('error', (err) => {
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'integration') {
    console.error('Redis Client Error:', err);
  }
});

redisClient.on('connect', () => {
  console.log('Redis client connected successfully');
});

export async function initializeRedis() {
  try {
    await redisClient.ping();
    console.log('Redis Connection Verified');
  } catch (error) {
    console.error('Failed to initialize Redis:', error);
    throw error;
  }
}

export async function cacheNewsletter(
  key: string, 
  newsletter: any, 
  expirySeconds: number = 3600  // Default 1 hour
) {
  try {
    await redisClient.set(
      key, 
      JSON.stringify(newsletter), 
      'EX', 
      expirySeconds
    );
    console.log(`Newsletter cached: ${key}, Expiry: ${expirySeconds}s`);
  } catch (error) {
    console.error('Error caching newsletter:', error);
    throw error;
  }
}

export async function getCachedNewsletter(key: string) {
  try {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error('Error retrieving cached newsletter:', error);
    throw error;
  }
}

export async function deleteCachedNewsletter(key: string) {
  try {
    await redisClient.del(key);
    console.log(`Deleted cached newsletter: ${key}`);
  } catch (error) {
    console.error('Error deleting cached newsletter:', error);
    throw error;
  }
}

// Graceful shutdown
export async function closeRedisConnection() {
  try {
    await redisClient.quit();
    console.log('Redis connection closed');
  } catch (error) {
    console.error('Error closing Redis connection:', error);
  }
}
