import request from 'supertest';
import { app } from '../app';
import { User } from '../models/User';
import { Interest } from '../models/Interest';
import { getTestDataSource } from '../config/testDatabase';
import { UserService } from '../services/UserService';
import bcrypt from 'bcrypt';

describe('Authentication Endpoints', () => {
  const testDataSource = getTestDataSource();
  const _userService = new UserService(testDataSource);

  beforeEach(async () => {
    // Database will be cleared by setup.ts
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app).post('/api/auth/register').send({
        email: 'newuser@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(201);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe('newuser@example.com');
      expect(response.body.user.isEmailVerified).toBe(false);
      expect(response.body.token).toBeDefined();
    });

    it('should reject registration with existing email', async () => {
      // First create a user
      const userRepo = testDataSource.getRepository(User);
      await userRepo.save({
        name: 'Existing User',
        email: 'existinguser@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
      });

      // Try to register with same email
      const response = await request(app).post('/api/auth/register').send({
        email: 'existinguser@example.com',
        password: 'newpassword123',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      const userRepo = testDataSource.getRepository(User);
      await userRepo.save({
        name: 'Test User',
        email: 'testuser@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
      });
    });

    it('should login successfully with correct credentials', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'testuser@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.token).toBeDefined();
    });

    it('should reject login with incorrect password', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });

    it('should reject login with non-existent email', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    beforeEach(async () => {
      // Create a test user
      const userRepo = testDataSource.getRepository(User);
      await userRepo.save({
        name: 'Test User',
        email: 'testuser@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
      });
    });

    it('should generate a password reset token', async () => {
      const response = await request(app).post('/api/auth/forgot-password').send({
        email: 'testuser@example.com',
      });

      expect(response.status).toBe(200);
      expect(response.body.resetToken).toBeDefined();
    });

    it('should reject password reset for non-existent email', async () => {
      const response = await request(app).post('/api/auth/forgot-password').send({
        email: 'nonexistent@example.com',
      });

      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('POST /api/auth/reset-password', () => {
    beforeEach(async () => {
      // Create a test user with a reset token
      const hashedPassword = await bcrypt.hash('oldpassword', 10);
      const hashedResetToken = await bcrypt.hash('valid-reset-token', 10);
      const resetExpires = new Date();
      resetExpires.setHours(resetExpires.getHours() + 1);

      const userRepo = testDataSource.getRepository(User);
      await userRepo.save({
        name: 'Reset Test User',
        email: 'resettest@example.com',
        passwordHash: hashedPassword,
        passwordResetToken: hashedResetToken,
        passwordResetExpires: resetExpires,
      });
    });

    it('should reset password successfully', async () => {
      const response = await request(app).post('/api/auth/reset-password').send({
        token: 'valid-reset-token',
        newPassword: 'newpassword123',
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Password has been reset');
    });

    it('should reject reset with invalid token', async () => {
      const response = await request(app).post('/api/auth/reset-password').send({
        token: 'invalid-reset-token',
        newPassword: 'newpassword123',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });
});
