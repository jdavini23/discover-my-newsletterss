import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/customErrors';

// Error response interface
interface ErrorResponse {
  status: 'error';
  statusCode: number;
  message: string;
  stack?: string;
}

// Error handler with explicit return type
export const _errorHandler = (_req: Request, _res: Response, _next: NextFunction): void => {
  // Default error values
  let statusCode = 500;
  let errorResponse: ErrorResponse = {
    status: 'error',
    statusCode,
    message: 'Internal Server Error',
  };

  // Handle custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorResponse = {
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    };
  }

  // Handle TypeORM validation errors
  if (err.name === 'QueryFailedError') {
    statusCode = 400;
    errorResponse = {
      status: 'error',
      statusCode: 400,
      message: 'Database validation error',
    };
  }

  // Handle Validation errors (e.g., from class-validator)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorResponse = {
      status: 'error',
      statusCode: 400,
      message: err.message,
    };
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  // Log the error
  console.error(`[ERROR] ${err.message}`, err);

  // Send error response
  res.status(statusCode).json(errorResponse);
};

// Async error wrapper to simplify error handling in route handlers
export const _asyncHandler = <T extends (_____req: Request, _____res: Response, _____next: NextFunction) => Promise<unknown>>(
  fn: T
): ((_____req: Request, _____res: Response, _____next: NextFunction) => Promise<void>) => {
  return async (____req: Request, ____res: Response, ____next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (_error: unknown) {
      next(error);
    }
  };
};

// Create a custom error logger for non-production environments
export const _logError = (_req: Request, _res: Response, _next: NextFunction): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${new Date().toISOString()}] Error:`, error);
  }
};
