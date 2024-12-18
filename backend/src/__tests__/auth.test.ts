import request from 'supertest';
import { app } from '../app';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { setup, teardown } from './setup';

describe('Authentication Endpoints', () => {
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await teardown();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
          preferences: ['Technology', 'Sports']
        });

      console.log('Registration Response:', response.status, response.body);
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe('newuser@example.com');
      expect(response.body.user.isEmailVerified).toBe(false);
    });

    it('should reject registration with existing email', async () => {
      // First, register a user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'existinguser@example.com',
          password: 'password123',
          firstName: 'Existing',
          lastName: 'User'
        });

      // Try to register with the same email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'existinguser@example.com',
          password: 'anotherpassword',
          firstName: 'Another',
          lastName: 'User'
        });

      console.log('Registration Response:', response.status, response.body);
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Ensure a user exists for login tests
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'logintest@example.com',
          password: 'loginpassword',
          firstName: 'Login',
          lastName: 'Test'
        });
    });

    it('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'loginpassword'
        });

      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.token).toBeDefined();
    });

    it('should reject login with incorrect password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'logintest@example.com',
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
          password: 'somepassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid email or password');
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    beforeEach(async () => {
      // Ensure a user exists for password reset tests
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'resetpassword@example.com',
          password: 'oldpassword',
          firstName: 'Reset',
          lastName: 'Password'
        });
    });

    it('should generate a password reset token', async () => {
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({
          email: 'resetpassword@example.com'
        });

      console.log('Forgot Password Response:', response.status, response.body);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Password reset token generated');
      
      // In development, the token should be returned
      if (process.env.NODE_ENV === 'development') {
        expect(response.body.resetToken).toBeDefined();
      }
    });

    it('should reject password reset for non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({
          email: 'nonexistent@example.com'
        });

      console.log('Forgot Password Response:', response.status, response.body);
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('No user found');
    });
  });

  describe('POST /api/auth/reset-password', () => {
    let resetToken: string;
    const testUser = {
      email: 'resettest@example.com',
      password: 'oldpassword',
      firstName: 'Reset',
      lastName: 'Test'
    };

    beforeEach(async () => {
      // Ensure the user is registered first
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      console.log('Registration Response:', registerResponse.status, registerResponse.body);
      
      // Check for registration success or existing user
      if (registerResponse.status === 400 && registerResponse.body.error.includes('already exists')) {
        // User already exists, that's fine
        console.log('User already exists, proceeding with existing user');
      } else {
        // For new registrations, check status code
        expect(registerResponse.status).toBeGreaterThanOrEqual(200);
        expect(registerResponse.status).toBeLessThan(300);
      }

      // Then initiate password reset
      const resetResponse = await request(app)
        .post('/api/auth/forgot-password')
        .send({
          email: testUser.email
        });

      console.log('Reset Response:', resetResponse.status, resetResponse.body);
      expect(resetResponse.status).toBe(200);

      // Ensure we have a reset token
      resetToken = resetResponse.body.resetToken;
      console.log('Generated Reset Token:', resetToken);
      expect(resetToken).toBeDefined();
    });

    it('should reset password successfully', async () => {
      console.log('Using Reset Token:', resetToken);
      const response = await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: resetToken,
          newPassword: 'newpassword123'
        });

      console.log('Reset Password Response:', response.status, response.body);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Password reset successfully');

      // Verify new password works
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'newpassword123'
        });

      expect(loginResponse.status).toBe(200);
    });

    it('should reject reset with invalid token', async () => {
      const response = await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: 'invalidtoken',
          newPassword: 'newpassword123'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid or expired reset token');
    });
  });
});
