import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateClass } from '../utils/validation';
import { ValidationError } from 'class-validator';

// Middleware to validate request body against a DTO class
export function validateRequest<T extends object>(
  dtoClass: ClassConstructor<T>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body against the DTO
      await validateClass(dtoClass, req.body);
      next();
    } catch (errors) {
      // Type-safe error handling
      const formattedErrors = Array.isArray(errors) 
        ? (errors as ValidationError[]).map((error) => ({
            property: error.property,
            constraints: error.constraints ? Object.values(error.constraints) : []
          }))
        : [];

      res.status(400).json({
        message: 'Validation failed',
        errors: formattedErrors
      });
    }
  };
}

// Middleware to validate query parameters against a DTO class
export function validateQuery<T extends object>(
  dtoClass: ClassConstructor<T>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the query parameters against the DTO
      await validateClass(dtoClass, req.query);
      next();
    } catch (errors) {
      // Type-safe error handling
      const formattedErrors = Array.isArray(errors) 
        ? (errors as ValidationError[]).map((error) => ({
            property: error.property,
            constraints: error.constraints ? Object.values(error.constraints) : []
          }))
        : [];

      res.status(400).json({
        message: 'Query validation failed',
        errors: formattedErrors
      });
    }
  };
}

// Example DTO for query validation
import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;

  @IsOptional()
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  limit?: number = 10;
}
