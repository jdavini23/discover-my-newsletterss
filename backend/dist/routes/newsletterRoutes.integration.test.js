"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const Newsletter_1 = require("../models/Newsletter");
const Interest_1 = require("../models/Interest");
const testDatabase_1 = require("../config/testDatabase");
describe('Newsletter Routes Integration Tests', () => {
    let testInterest;
    beforeAll(async () => {
        // Initialize test database
        await (0, testDatabase_1.setupTestDatabase)();
        // Create a test interest
        const dataSource = (0, testDatabase_1.getTestDataSource)();
        const interestRepo = dataSource.getRepository(Interest_1.Interest);
        testInterest = new Interest_1.Interest();
        testInterest.name = 'Test Interest';
        const savedTestInterest = await interestRepo.save(testInterest);
        console.log('Saved Test Interest:', savedTestInterest);
        console.log('Saved Test Interest ID:', savedTestInterest.id);
        // Verify the interest was saved
        const foundInterest = await interestRepo.findOne({ where: { id: savedTestInterest.id } });
        console.log('Found Interest:', foundInterest);
        expect(foundInterest).toBeDefined();
        expect(foundInterest === null || foundInterest === void 0 ? void 0 : foundInterest.id).toBe(savedTestInterest.id);
        expect(foundInterest === null || foundInterest === void 0 ? void 0 : foundInterest.name).toBe('Test Interest');
    });
    afterAll(async () => {
        // Cleanup test database
        await (0, testDatabase_1.teardownTestDatabase)();
    });
    describe('POST /newsletters', () => {
        it('should create a new newsletter', async () => {
            const newsletterData = {
                name: 'Integration Test Newsletter',
                description: 'A newsletter created during integration testing',
                authorName: 'Test Author',
                url: 'https://test-newsletter.com',
                frequency: 'weekly',
                interestIds: [testInterest.id]
            };
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/newsletters')
                .send(newsletterData);
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject({
                name: 'Integration Test Newsletter',
                description: 'A newsletter created during integration testing',
                authorName: 'Test Author',
                url: 'https://test-newsletter.com',
                frequency: 'weekly'
            });
            // Verify interests are correctly associated
            const dataSource = (0, testDatabase_1.getTestDataSource)();
            const newsletterRepo = dataSource.getRepository(Newsletter_1.Newsletter);
            const savedNewsletter = await newsletterRepo.findOne({
                where: { id: response.body.id },
                relations: ['interests']
            });
            console.log('Saved Newsletter:', savedNewsletter);
            console.log('Associated Interests:', savedNewsletter === null || savedNewsletter === void 0 ? void 0 : savedNewsletter.interests);
            expect(savedNewsletter).toBeDefined();
            expect(savedNewsletter === null || savedNewsletter === void 0 ? void 0 : savedNewsletter.interests).toHaveLength(1);
            expect(savedNewsletter === null || savedNewsletter === void 0 ? void 0 : savedNewsletter.interests[0].id).toBe(testInterest.id);
            // Verify via GET request
            const getResponse = await (0, supertest_1.default)(app_1.app)
                .get(`/newsletters/${response.body.id}`);
            expect(getResponse.status).toBe(200);
            expect(getResponse.body.interests).toHaveLength(1);
            expect(getResponse.body.interests[0].id).toBe(testInterest.id);
        });
        it('should return validation error for incomplete newsletter', async () => {
            const incompleteNewsletterData = {
                name: 'Incomplete Newsletter'
            };
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/newsletters')
                .send(incompleteNewsletterData);
            expect(response.status).toBe(400);
            expect(response.body.status).toBe('error');
            expect(response.body.message).toContain('Missing required');
        });
    });
    describe('GET /newsletters', () => {
        beforeEach(async () => {
            // Seed some newsletters for testing
            const dataSource = (0, testDatabase_1.getTestDataSource)();
            const newsletterRepo = dataSource.getRepository(Newsletter_1.Newsletter);
            const existingNewsletters = await newsletterRepo.find();
            const newslettersToSave = [
                {
                    name: 'Tech Weekly',
                    description: 'Tech news newsletter',
                    authorName: 'Tech Insider',
                    url: 'https://techweekly.com',
                    frequency: 'weekly',
                    interests: [testInterest]
                },
                {
                    name: 'Science Monthly',
                    description: 'Science discoveries newsletter',
                    authorName: 'Science Mag',
                    url: 'https://sciencemonthly.com',
                    frequency: 'monthly',
                    interests: [testInterest]
                },
                {
                    name: 'Integration Test Newsletter',
                    description: 'A newsletter created during integration testing',
                    authorName: 'Test Author',
                    url: 'https://test-newsletter.com',
                    frequency: 'weekly',
                    interests: [testInterest]
                }
            ].filter(newsletter => {
                return !existingNewsletters.find(existingNewsletter => existingNewsletter.name === newsletter.name);
            });
            await newsletterRepo.save(newslettersToSave);
        });
        it('should fetch newsletters with pagination', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .get('/newsletters')
                .query({ page: 1, limit: 10 });
            expect(response.status).toBe(200);
            expect(response.body.newsletters).toHaveLength(3);
            expect(response.body.total).toBe(3);
            expect(response.body.page).toBe(1);
            expect(response.body.limit).toBe(10);
        });
        it('should filter newsletters by frequency', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .get('/newsletters')
                .query({ frequency: 'weekly' });
            expect(response.status).toBe(200);
            expect(response.body.newsletters).toHaveLength(2);
            expect(response.body.newsletters[0].name).toBe('Tech Weekly');
        });
    });
    describe('GET /newsletters/:id', () => {
        let testNewsletterId;
        beforeEach(async () => {
            // Create a test newsletter
            const dataSource = (0, testDatabase_1.getTestDataSource)();
            const newsletterRepo = dataSource.getRepository(Newsletter_1.Newsletter);
            const existingNewsletters = await newsletterRepo.find();
            const newsletter = {
                name: 'Test Get Newsletter',
                description: 'Newsletter for get by ID test',
                authorName: 'Test Author',
                url: 'https://test-get.com',
                frequency: 'daily',
                interests: [testInterest]
            };
            const existingNewsletter = existingNewsletters.find(existingNewsletter => existingNewsletter.name === newsletter.name);
            if (!existingNewsletter) {
                const newNewsletter = new Newsletter_1.Newsletter();
                newNewsletter.name = newsletter.name;
                newNewsletter.description = newsletter.description;
                newNewsletter.authorName = newsletter.authorName;
                newNewsletter.url = newsletter.url;
                newNewsletter.frequency = newsletter.frequency;
                newNewsletter.interests = newsletter.interests;
                const savedNewsletter = await newsletterRepo.save(newNewsletter);
                testNewsletterId = savedNewsletter.id;
            }
            else {
                testNewsletterId = existingNewsletter.id;
            }
        });
        it('should get newsletter by ID with interests', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .get(`/newsletters/${testNewsletterId}`);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Test Get Newsletter');
            expect(response.body.interests).toHaveLength(1);
            expect(response.body.interests[0].id).toBe(testInterest.id);
        });
        it('should return 404 for non-existent newsletter', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .get('/newsletters/non-existent-id');
            expect(response.status).toBe(404);
            expect(response.body.status).toBe('error');
            expect(response.body.message).toContain('Newsletter not found');
        });
    });
});
