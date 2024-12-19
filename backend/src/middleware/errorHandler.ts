import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/customErrors';

// Error response interface
interface ErrorResponse {
  status: 'error';
  statusCode: number;
  message: string;
  stack?: string;
}

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // Default error values
  let statusCode = 500;
  let errorResponse: ErrorResponse = {
    status: 'error',
    statusCode: statusCode,
    message: 'Internal Server Error'
  };

  // Handle custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorResponse = {
      status: 'error',
      statusCode: err.statusCode,
      message: err.message
    };
  }

  // Handle TypeORM validation errors
  if (err.name === 'QueryFailedError') {
    statusCode = 400;
    errorResponse = {
      status: 'error',
      statusCode: 400,
      message: 'Database validation error'
    };
  }

  // Handle Validation errors (e.g., from class-validator)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorResponse = {
      status: 'error',
      statusCode: 400,
      message: err.message
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
export const asyncHandler = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
