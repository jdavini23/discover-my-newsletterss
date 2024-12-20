import { Request, Response } from 'express';
;
;
import { validateRequest, validateQuery, PaginationQueryDto,  } from '../middleware/validationMiddleware';

// Example user controller with integrated validation
export class UserController {
  // Route handler for user registration with Joi schema validation
  static async registerUser(____req: Request, ____res: Response): Promise<void> {
    try {
      // Validate incoming data using Joi schema
      const { email, password, name } = req.body;
      validateSchema(req.body, userRegistrationSchema);

      // Proceed with user registration logic
      // ... create user, hash password, etc.
      res.status(201).json({
        message: 'User registered successfully',
        user: { email, name },
      });
    } catch (_error: unknown) {
      res.status(400).json({
        message: 'Registration failed',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Route handler for user registration with class-validator
  static async registerUserClassValidator(____req: Request, ____res: Response): Promise<void> {
    try {
      // The validation middleware will handle DTO validation
      const { email, password, name } = req.body;

      // Proceed with user registration logic
      // ... create user, hash password, etc.
      res.status(201).json({
        message: 'User registered successfully',
        user: { email, name },
      });
    } catch (_error: unknown) {
      res.status(500).json({
        message: 'Registration failed',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Example route with query parameter validation
  static async listUsers(____req: Request, ____res: Response): Promise<void> {
    try {
      // The validation middleware will handle query validation
      const { page, limit } = req.query;

      // Fetch users with pagination
      // ... fetch users from database based on page and limit
      res.status(200).json({
        users: [],
        page: Number(page || 1),
        limit: Number(limit || 10),
      });
    } catch (_error: unknown) {
      res.status(500).json({
        message: 'Failed to fetch users',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

// Example routes using the validation middleware
;
export const userRouter = express.Router();

// Joi schema validation route
userRouter.post(
  '/register',
  validateRequest(UserRegistrationDto),
  UserController.registerUserClassValidator
);

// Query parameter validation route
userRouter.get('/users', validateQuery(PaginationQueryDto), UserController.listUsers);
