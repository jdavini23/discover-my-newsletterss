"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.UserController = void 0;
const validation_1 = require("../utils/validation");
const validation_2 = require("../utils/validation");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
// Example user controller with integrated validation
class UserController {
    // Route handler for user registration with Joi schema validation
    static async registerUser(req, res) {
        try {
            // Validate incoming data using Joi schema
            const { email, password, name } = req.body;
            (0, validation_1.validateSchema)(req.body, validation_1.userRegistrationSchema);
            // Proceed with user registration logic
            // ... create user, hash password, etc.
            res.status(201).json({
                message: 'User registered successfully',
                user: { email, name }
            });
        }
        catch (error) {
            res.status(400).json({
                message: 'Registration failed',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
    // Route handler for user registration with class-validator
    static async registerUserClassValidator(req, res) {
        try {
            // The validation middleware will handle DTO validation
            const { email, password, name } = req.body;
            // Proceed with user registration logic
            // ... create user, hash password, etc.
            res.status(201).json({
                message: 'User registered successfully',
                user: { email, name }
            });
        }
        catch (error) {
            res.status(500).json({
                message: 'Registration failed',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
    // Example route with query parameter validation
    static async listUsers(req, res) {
        try {
            // The validation middleware will handle query validation
            const { page, limit } = req.query;
            // Fetch users with pagination
            // ... fetch users from database based on page and limit
            res.status(200).json({
                users: [],
                page: Number(page || 1),
                limit: Number(limit || 10)
            });
        }
        catch (error) {
            res.status(500).json({
                message: 'Failed to fetch users',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}
exports.UserController = UserController;
// Example routes using the validation middleware
const express_1 = __importDefault(require("express"));
exports.userRouter = express_1.default.Router();
// Joi schema validation route
exports.userRouter.post('/register', (0, validationMiddleware_1.validateRequest)(validation_2.UserRegistrationDto), UserController.registerUserClassValidator);
// Query parameter validation route
exports.userRouter.get('/users', (0, validationMiddleware_1.validateQuery)(validationMiddleware_1.PaginationQueryDto), UserController.listUsers);
