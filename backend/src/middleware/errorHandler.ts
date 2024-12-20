import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/customErrors';

interface ErrorResponse {
  statusCode: number;
  message: string;
  stack?: string;
  errors?: any;
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  const errorResponse: ErrorResponse = {
    statusCode: 500,
    message: 'Internal Server Error'
  };

  // Handle custom application errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorResponse.statusCode = err.statusCode;
    errorResponse.message = err.message;
  }

  // Handle database query errors
  if (err.name === 'QueryFailedError') {
    statusCode = 400;
    errorResponse.statusCode = 400;
    errorResponse.message = 'Database query failed';
    errorResponse.errors = {
      detail: err.message
    };
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorResponse.statusCode = 400;
    errorResponse.message = err.message;
    errorResponse.errors = err;
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  // Log error
  console.error(`[ERROR] ${err.message}`, err);

  // Send error response
  res.status(statusCode).json(errorResponse);
};

export const asyncHandler = <T extends (req: Request, res: Response, next: NextFunction) => Promise<unknown>>(
  fn: T
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });

  next();
};

export const errorLogger = (
  error: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.error(`[${new Date().toISOString()}] Error:`, error);
  next(error);
};
