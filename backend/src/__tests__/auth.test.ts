import request from 'supertest';
import { app } from '../app';
import { User } from '../models/User';
import { TestDataSource } from '../config/testDatabase';
import { clearDatabase } from './setup';
import bcrypt from 'bcrypt';

describe('Authentication Endpoints', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'New User',
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
      const userRepo = TestDataSource.getRepository(User);
      await userRepo.save({
        name: 'Existing User',
        email: 'existinguser@example.com',
        passwordHash: await bcrypt.hash('password123', 10)
      });

      // Try to register with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Another User',
          email: 'existinguser@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      const userRepo = TestDataSource.getRepository(User);
      await userRepo.save({
        name: 'Test User',
        email: 'testuser@example.com',
        passwordHash: await bcrypt.hash('password123', 10)
      });
    });

    it('should login successfully with correct credentials', async () => {
      const response = await request(app)
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
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid email or password');
    });

    it('should reject login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid email or password');
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    beforeEach(async () => {
      // Create a test user
      const userRepo = TestDataSource.getRepository(User);
      await userRepo.save({
        name: 'Test User',
        email: 'testuser@example.com',
        passwordHash: await bcrypt.hash('password123', 10)
      });
    });

    it('should generate a password reset token', async () => {
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({
          email: 'testuser@example.com'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Password reset token generated');
    });

    it('should reject password reset for non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({
          email: 'nonexistent@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('No user found');
    });
  });

  describe('POST /api/auth/reset-password', () => {
    let resetToken: string;

    beforeEach(async () => {
      // Create a test user with a reset token
      const userRepo = TestDataSource.getRepository(User);
      resetToken = 'valid-reset-token';
      const resetExpires = new Date();
      resetExpires.setHours(resetExpires.getHours() + 1);

      await userRepo.save({
        name: 'Reset Test User',
        email: 'resettest@example.com',
        passwordHash: await bcrypt.hash('oldpassword', 10),
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires
      });
    });

    it('should reset password successfully', async () => {
      const response = await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: resetToken,
          newPassword: 'newpassword123'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Password has been reset');

      // Try logging in with new password
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'resettest@example.com',
          password: 'newpassword123'
        });

      expect(loginResponse.status).toBe(200);
    });

    it('should reject reset with invalid token', async () => {
      const response = await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: 'invalid-token',
          newPassword: 'newpassword123'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid or expired reset token');
    });
  });
});
