"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const redis_1 = require("../config/redis");
const Newsletter_1 = require("../models/Newsletter");
const database_2 = require("../config/database");
async function testRedisCaching() {
    console.log('🚀 Starting Redis Caching Test...');
    try {
        console.log('1️⃣ Initializing Database...');
        await (0, database_1.initializeDatabase)();
        console.log('2️⃣ Initializing Redis...');
        await (0, redis_1.initializeRedis)();
        console.log('3️⃣ Creating Newsletter Repository...');
        const newsletterRepository = database_2.AppDataSource.getRepository(Newsletter_1.Newsletter);
        console.log('4️⃣ Finding or Creating Test Newsletter...');
        let newsletter = await newsletterRepository.findOne({
            where: { name: 'Test Newsletter' }
        });
        if (!newsletter) {
            console.log('   4a. No existing newsletter found. Creating new one...');
            newsletter = newsletterRepository.create({
                name: 'Test Newsletter',
                description: 'A newsletter for testing Redis caching',
                authorName: 'Test Author',
                url: 'https://test-newsletter.com',
                frequency: Newsletter_1.NewsletterFrequency.WEEKLY
            });
            await newsletterRepository.save(newsletter);
            console.log('   4b. Newsletter created successfully');
        }
        console.log('5️⃣ Caching Newsletter...');
        const cacheKey = `newsletter:${newsletter.id}`;
        await (0, redis_1.cacheNewsletter)(cacheKey, newsletter, 1); // 1-second expiry for testing
        console.log('6️⃣ Retrieving Cached Newsletter...');
        const cachedNewsletter = await (0, redis_1.getCachedNewsletter)(cacheKey);
        if (cachedNewsletter) {
            console.log('7️⃣ Cache Retrieval Successful:');
            console.log(cachedNewsletter);
            console.log('✅ Redis Caching Test Completed Successfully');
            return true;
        }
        else {
            console.error('❌ Failed to retrieve cached newsletter');
            return false;
        }
    }
    catch (error) {
        console.error('❌ Redis Caching Test Failed:', error);
        return false;
    }
    finally {
        console.log('🔚 Closing Redis Connection...');
        await (0, redis_1.closeRedisConnection)();
    }
}
// Run the test
testRedisCaching()
    .then((success) => {
    console.log(success ? 'Test Passed' : 'Test Failed');
    process.exit(success ? 0 : 1);
})
    .catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
