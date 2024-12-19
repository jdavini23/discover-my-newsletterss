import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Enhanced logging for Redis connection
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  connectTimeout: 10000, // 10 seconds
  maxRetriesPerRequest: 3,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    console.warn(`Redis connection retry attempt ${times}, delay: ${delay}ms`);
    return delay;
  }
};

export const redisClient = new Redis(redisConfig);

// Enhanced error handling
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis Client Connected Successfully');
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
