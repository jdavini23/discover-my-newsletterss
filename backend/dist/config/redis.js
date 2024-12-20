"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.initializeRedis = initializeRedis;
exports.cacheNewsletter = cacheNewsletter;
exports.getCachedNewsletter = getCachedNewsletter;
exports.deleteCachedNewsletter = deleteCachedNewsletter;
exports.closeRedisConnection = closeRedisConnection;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Enhanced logging for Redis connection
const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    retryStrategy: (times) => {
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
exports.redisClient = new ioredis_1.default(redisConfig);
exports.redisClient.on('error', (err) => {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'integration') {
        console.error('Redis Client Error:', err);
    }
});
exports.redisClient.on('connect', () => {
    console.log('Redis client connected successfully');
});
async function initializeRedis() {
    try {
        await exports.redisClient.ping();
        console.log('Redis Connection Verified');
    }
    catch (error) {
        console.error('Failed to initialize Redis:', error);
        throw error;
    }
}
async function cacheNewsletter(key, newsletter, expirySeconds = 3600 // Default 1 hour
) {
    try {
        await exports.redisClient.set(key, JSON.stringify(newsletter), 'EX', expirySeconds);
        console.log(`Newsletter cached: ${key}, Expiry: ${expirySeconds}s`);
    }
    catch (error) {
        console.error('Error caching newsletter:', error);
        throw error;
    }
}
async function getCachedNewsletter(key) {
    try {
        const cachedData = await exports.redisClient.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    }
    catch (error) {
        console.error('Error retrieving cached newsletter:', error);
        throw error;
    }
}
async function deleteCachedNewsletter(key) {
    try {
        await exports.redisClient.del(key);
        console.log(`Deleted cached newsletter: ${key}`);
    }
    catch (error) {
        console.error('Error deleting cached newsletter:', error);
        throw error;
    }
}
// Graceful shutdown
async function closeRedisConnection() {
    try {
        await exports.redisClient.quit();
        console.log('Redis connection closed');
    }
    catch (error) {
        console.error('Error closing Redis connection:', error);
    }
}
