"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const database_1 = require("../../config/database");
const User_1 = require("../../models/User");
const Interest_1 = require("../../models/Interest");
const Newsletter_1 = require("../../models/Newsletter");
const authUtils_1 = require("../../utils/authUtils");
describe('Recommendation Controller Integration Tests', () => {
    let authToken;
    let testUser;
    let testInterests;
    let testNewsletters;
    beforeAll(async () => {
        // Ensure database connection
        if (!database_1.AppDataSource.isInitialized) {
            await database_1.AppDataSource.initialize();
        }
        // Create test user
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const interestRepository = database_1.AppDataSource.getRepository(Interest_1.Interest);
        const newsletterRepository = database_1.AppDataSource.getRepository(Newsletter_1.Newsletter);
        // Create test interests
        testInterests = await interestRepository.save([
            { name: 'Technology' },
            { name: 'Science' },
            { name: 'Business' }
        ]);
        // Create test newsletters
        testNewsletters = await newsletterRepository.save([
            {
                title: 'Tech Weekly',
                description: 'Latest tech news',
                interests: [testInterests[0]],
                averageRating: 4.5
            },
            {
                title: 'Science Digest',
                description: 'Scientific discoveries',
                interests: [testInterests[1]],
                averageRating: 4.7
            }
        ]);
        // Create test user with preferences
        testUser = await userRepository.save({
            email: 'test.recommendations@example.com',
            password: 'testpassword123',
            preferences: [testInterests[0]]
        });
        // Generate JWT token
        authToken = (0, authUtils_1.generateJwtToken)(testUser);
    });
    afterAll(async () => {
        // Clean up test data
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const interestRepository = database_1.AppDataSource.getRepository(Interest_1.Interest);
        const newsletterRepository = database_1.AppDataSource.getRepository(Newsletter_1.Newsletter);
        await newsletterRepository.remove(testNewsletters);
        await interestRepository.remove(testInterests);
        await userRepository.remove(testUser);
        await database_1.AppDataSource.destroy();
    });
    describe('GET /recommendations/newsletters', () => {
        it('should return personalized newsletter recommendations', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .get('/api/recommendations/newsletters')
                .set('Authorization', `Bearer ${authToken}`)
                .query({ page: 1, limit: 10 });
            expect(response.status).toBe(200);
            expect(response.body.newsletters).toBeDefined();
            expect(response.body.total).toBeDefined();
            expect(response.body.matchedInterests).toBeDefined();
        });
        it('should handle no preferences scenario', async () => {
            // Create a user without preferences
            const noPreferencesUser = await database_1.AppDataSource.getRepository(User_1.User).save({
                email: 'no.preferences@example.com',
                password: 'testpassword123'
            });
            const noPreferencesToken = (0, authUtils_1.generateJwtToken)(noPreferencesUser);
            const response = await (0, supertest_1.default)(app_1.app)
                .get('/api/recommendations/newsletters')
                .set('Authorization', `Bearer ${noPreferencesToken}`)
                .query({ page: 1, limit: 10 });
            expect(response.status).toBe(200);
            expect(response.body.newsletters).toHaveLength(0);
            expect(response.body.message).toBe('No preferences set for personalized recommendations');
            // Clean up
            await database_1.AppDataSource.getRepository(User_1.User).remove(noPreferencesUser);
        });
    });
    describe('GET /recommendations/interests', () => {
        it('should return recommended interests', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .get('/api/recommendations/interests')
                .set('Authorization', `Bearer ${authToken}`)
                .query({ limit: 5 });
            expect(response.status).toBe(200);
            expect(response.body.recommendedInterests).toBeDefined();
            expect(response.body.currentInterests).toBeDefined();
        });
    });
});
