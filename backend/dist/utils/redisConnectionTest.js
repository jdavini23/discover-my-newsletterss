"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function testRedisConnection() {
    console.log('🔍 Starting Redis Connection Test...');
    try {
        const redisClient = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
            connectTimeout: 5000,
            maxRetriesPerRequest: 3
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
    }
    catch (error) {
        console.error('❌ Redis Connection Test Failed:', error);
        process.exit(1);
    }
}
testRedisConnection();
