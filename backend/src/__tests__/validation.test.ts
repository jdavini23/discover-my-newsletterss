import { validateSchema, userRegistrationSchema, newsletterPreferencesSchema, UserRegistrationDto, validateClass,  } from '../utils/validation';
import { validate, ValidationError } from 'class-validator';

jest.mock('../config/testDatabase', () => ({}));

describe('Validation Utility', () => {
  describe('Joi Schema Validation', () => {
    // User Registration Validation
    it('should pass valid user registration data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'securePassword123',
        name: 'John Doe',
      };

      expect(() => validateSchema(validData, userRegistrationSchema)).not.toThrow();
    });

    it('should throw error for invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'securePassword123',
        name: 'John Doe',
      };

      expect(() => validateSchema(invalidData, userRegistrationSchema)).toThrow('Validation Error');
    });

    // Newsletter Preferences Validation
    it('should pass valid newsletter preferences', () => {
      const validPreferences = {
        categories: ['technology', 'science'],
        frequency: 'weekly',
      };

      expect(() => validateSchema(validPreferences, newsletterPreferencesSchema)).not.toThrow();
    });

    it('should throw error for invalid newsletter preferences', () => {
      const invalidPreferences = {
        categories: [],
        frequency: 'yearly',
      };

      expect(() => validateSchema(invalidPreferences, newsletterPreferencesSchema)).toThrow(
        'Validation Error'
      );
    });
  });

  describe('Class-Validator Validation', () => {
    it('should validate a valid user registration DTO', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'securePassword123',
        name: 'John Doe',
      };

      const result = await validateClass(UserRegistrationDto, validUserData);
      expect(result).toBeTruthy();
      expect(result.email).toBe('test@example.com');
    });

    it('should reject invalid user registration DTO', async () => {
      const invalidUserData = {
        email: 'invalid-email',
        password: '123',
        name: 'J',
      };

      const userDto = await validateClass(UserRegistrationDto, invalidUserData);
      const errors: ValidationError[] = await validate(userDto);

      expect(errors.length).toBe(3);

      const emailError = errors.find((error) => error.property === 'email');
      expect(emailError).toBeTruthy();
      expect(emailError?.constraints?.isEmail).toBe('Invalid email format');

      const passwordError = errors.find((error) => error.property === 'password');
      expect(passwordError).toBeTruthy();
      expect(passwordError?.constraints?.minLength).toBe(
        'Password must be at least 8 characters long'
      );

      const nameError = errors.find((error) => error.property === 'name');
      expect(nameError).toBeTruthy();
      expect(nameError?.constraints?.minLength).toBe('Name must be at least 2 characters long');
    });
  });
});
