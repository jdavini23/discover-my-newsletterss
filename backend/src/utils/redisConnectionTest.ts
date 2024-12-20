import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

async function testRedisConnection(): Promise<void> {
  console.log('🔍 Starting Redis Connection Test...');

  try {
    const redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      connectTimeout: 5000,
      maxRetriesPerRequest: 3,
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis Connection Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis Connected Successfully');
    });

    // Ping Redis
    const pingResult = await redisClient.ping();
    console.log('📡 Ping Result:', pingResult);

    // Test Set and Get
    const testKey = 'connection_test';
    await redisClient.set(testKey, 'Hello, Redis!');
    const testValue = await redisClient.get(testKey);
    console.log('🔑 Test Key Value:', testValue);

    await redisClient.quit();
    console.log('🏁 Redis Connection Test Completed Successfully');
    process.exit(0);
  } catch (_error: unknown) {
    console.error('❌ Redis Connection Test Failed:', error);
    process.exit(1);
  }
}

testRedisConnection();
