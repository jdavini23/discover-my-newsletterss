"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../utils/validation");
const class_validator_1 = require("class-validator");
jest.mock('../config/testDatabase', () => ({}));
describe('Validation Utility', () => {
    describe('Joi Schema Validation', () => {
        // User Registration Validation
        it('should pass valid user registration data', () => {
            const validData = {
                email: 'test@example.com',
                password: 'securePassword123',
                name: 'John Doe'
            };
            expect(() => (0, validation_1.validateSchema)(validData, validation_1.userRegistrationSchema)).not.toThrow();
        });
        it('should throw error for invalid email', () => {
            const invalidData = {
                email: 'invalid-email',
                password: 'securePassword123',
                name: 'John Doe'
            };
            expect(() => (0, validation_1.validateSchema)(invalidData, validation_1.userRegistrationSchema)).toThrow('Validation Error');
        });
        // Newsletter Preferences Validation
        it('should pass valid newsletter preferences', () => {
            const validPreferences = {
                categories: ['technology', 'science'],
                frequency: 'weekly'
            };
            expect(() => (0, validation_1.validateSchema)(validPreferences, validation_1.newsletterPreferencesSchema)).not.toThrow();
        });
        it('should throw error for invalid newsletter preferences', () => {
            const invalidPreferences = {
                categories: [],
                frequency: 'yearly'
            };
            expect(() => (0, validation_1.validateSchema)(invalidPreferences, validation_1.newsletterPreferencesSchema)).toThrow('Validation Error');
        });
    });
    describe('Class-Validator Validation', () => {
        it('should validate a valid user registration DTO', async () => {
            const validUserData = {
                email: 'test@example.com',
                password: 'securePassword123',
                name: 'John Doe'
            };
            const result = await (0, validation_1.validateClass)(validation_1.UserRegistrationDto, validUserData);
            expect(result).toBeTruthy();
            expect(result.email).toBe('test@example.com');
        });
        it('should reject invalid user registration DTO', async () => {
            var _a, _b, _c;
            const invalidUserData = {
                email: 'invalid-email',
                password: '123',
                name: 'J'
            };
            const userDto = await (0, validation_1.validateClass)(validation_1.UserRegistrationDto, invalidUserData);
            const errors = await (0, class_validator_1.validate)(userDto);
            expect(errors.length).toBe(3);
            const emailError = errors.find(error => error.property === 'email');
            expect(emailError).toBeTruthy();
            expect((_a = emailError === null || emailError === void 0 ? void 0 : emailError.constraints) === null || _a === void 0 ? void 0 : _a.isEmail).toBe('Invalid email format');
            const passwordError = errors.find(error => error.property === 'password');
            expect(passwordError).toBeTruthy();
            expect((_b = passwordError === null || passwordError === void 0 ? void 0 : passwordError.constraints) === null || _b === void 0 ? void 0 : _b.minLength).toBe('Password must be at least 8 characters long');
            const nameError = errors.find(error => error.property === 'name');
            expect(nameError).toBeTruthy();
            expect((_c = nameError === null || nameError === void 0 ? void 0 : nameError.constraints) === null || _c === void 0 ? void 0 : _c.minLength).toBe('Name must be at least 2 characters long');
        });
    });
});
