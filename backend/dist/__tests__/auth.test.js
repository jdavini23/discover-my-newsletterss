"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const User_1 = require("../models/User");
const testDatabase_1 = require("../config/testDatabase");
const UserService_1 = require("../services/UserService");
const bcrypt_1 = __importDefault(require("bcrypt"));
describe('Authentication Endpoints', () => {
    const testDataSource = (0, testDatabase_1.getTestDataSource)();
    const userService = new UserService_1.UserService(testDataSource);
    beforeEach(async () => {
        // Database will be cleared by setup.ts
    });
    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/auth/register')
                .send({
                email: 'newuser@example.com',
                password: 'password123'
            });
            expect(response.status).toBe(201);
            expect(response.body.user).toBeDefined();
            expect(response.body.user.email).toBe('newuser@example.com');
            expect(response.body.user.isEmailVerified).toBe(false);
            expect(response.body.token).toBeDefined();
        });
        it('should reject registration with existing email', async () => {
            // First create a user
            const userRepo = testDataSource.getRepository(User_1.User);
            await userRepo.save({
                name: 'Existing User',
                email: 'existinguser@example.com',
                passwordHash: await bcrypt_1.default.hash('password123', 10)
            });
            // Try to register with same email
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/auth/register')
                .send({
                email: 'existinguser@example.com',
                password: 'newpassword123'
            });
            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });
    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Create a test user
            const userRepo = testDataSource.getRepository(User_1.User);
            await userRepo.save({
                name: 'Test User',
                email: 'testuser@example.com',
                passwordHash: await bcrypt_1.default.hash('password123', 10)
            });
        });
        it('should login successfully with correct credentials', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/auth/login')
                .send({
                email: 'testuser@example.com',
                password: 'password123'
            });
            expect(response.status).toBe(200);
            expect(response.body.user).toBeDefined();
            expect(response.body.token).toBeDefined();
        });
        it('should reject login with incorrect password', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/auth/login')
                .send({
                email: 'testuser@example.com',
                password: 'wrongpassword'
            });
            expect(response.status).toBe(401);
            expect(response.body.error).toBeDefined();
        });
        it('should reject login with non-existent email', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/auth/login')
                .send({
                email: 'nonexistent@example.com',
                password: 'password123'
            });
            expect(response.status).toBe(401);
            expect(response.body.error).toBeDefined();
        });
    });
    describe('POST /api/auth/forgot-password', () => {
        beforeEach(async () => {
            // Create a test user
            const userRepo = testDataSource.getRepository(User_1.User);
            await userRepo.save({
                name: 'Test User',
                email: 'testuser@example.com',
                passwordHash: await bcrypt_1.default.hash('password123', 10)
            });
        });
        it('should generate a password reset token', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/auth/forgot-password')
                .send({
                email: 'testuser@example.com'
            });
            expect(response.status).toBe(200);
            expect(response.body.resetToken).toBeDefined();
        });
        it('should reject password reset for non-existent email', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/auth/forgot-password')
                .send({
                email: 'nonexistent@example.com'
            });
            expect(response.status).toBe(404);
            expect(response.body.error).toBeDefined();
        });
    });
    describe('POST /api/auth/reset-password', () => {
        beforeEach(async () => {
            // Create a test user with a reset token
            const hashedPassword = await bcrypt_1.default.hash('oldpassword', 10);
            const hashedResetToken = await bcrypt_1.default.hash('valid-reset-token', 10);
            const resetExpires = new Date();
            resetExpires.setHours(resetExpires.getHours() + 1);
            const userRepo = testDataSource.getRepository(User_1.User);
            await userRepo.save({
                name: 'Reset Test User',
                email: 'resettest@example.com',
                passwordHash: hashedPassword,
                passwordResetToken: hashedResetToken,
                passwordResetExpires: resetExpires
            });
        });
        it('should reset password successfully', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/auth/reset-password')
                .send({
                token: 'valid-reset-token',
                newPassword: 'newpassword123'
            });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Password has been reset');
        });
        it('should reject reset with invalid token', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/auth/reset-password')
                .send({
                token: 'invalid-reset-token',
                newPassword: 'newpassword123'
            });
            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });
});
