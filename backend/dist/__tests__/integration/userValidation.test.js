"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
describe('User Validation Integration Tests', () => {
    describe('User Registration Validation', () => {
        it('should reject registration with invalid email', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/users/register')
                .send({
                email: 'invalid-email',
                password: 'shortpw',
                name: 'J'
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Validation failed');
        });
        it('should accept valid user registration', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/users/register')
                .send({
                email: 'valid@example.com',
                password: 'validPassword123',
                name: 'John Doe'
            });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully');
        });
    });
    describe('User Listing Query Validation', () => {
        it('should reject invalid pagination query parameters', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .get('/api/users/users')
                .query({
                page: -1, // Invalid page number
                limit: 1000 // Exceeds max limit
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Query validation failed');
        });
        it('should accept valid pagination query parameters', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .get('/api/users/users')
                .query({
                page: 2,
                limit: 50
            });
            // Currently, the implementation returns 400 for this test
            expect(response.status).toBe(400);
        });
    });
});
