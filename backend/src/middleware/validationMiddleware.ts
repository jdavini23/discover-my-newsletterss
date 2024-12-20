import { Request, Response, NextFunction } from 'express';
import { ClassConstructor } from 'class-transformer';
import { validateClass } from '../utils/validation';
;
;

// Validation error interface
interface FormattedValidationError {
  property: string;
  constraints: string[];
}

// Middleware to validate request body against a DTO class
export const _validateRequest = <T extends object>(
  dtoClass: ClassConstructor<T>
) => async (____req: Request, ____res: Response, ____next: NextFunction) => {
  try {
    // Validate the request body against the DTO
    await validateClass(dtoClass, req.body);
    next();
  } catch (_error: unknown) {
    // Type-safe error handling
    const formattedErrors: FormattedValidationError[] = Array.isArray(errors)
      ? (errors as ValidationError[]).map((error) => ({
          property: error.property,
          constraints: error.constraints ? Object.values(error.constraints) : [],
        }))
      : [];

    res.status(400).json({
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
};

// Middleware to validate query parameters against a DTO class
export const _validateQuery = <T extends object>(
  dtoClass: ClassConstructor<T>
) => async (____req: Request, ____res: Response, ____next: NextFunction) => {
  try {
    // Validate the query parameters against the DTO
    await validateClass(dtoClass, req.query);
    next();
  } catch (_error: unknown) {
    // Type-safe error handling
    const formattedErrors: FormattedValidationError[] = Array.isArray(errors)
      ? (errors as ValidationError[]).map((error) => ({
          property: error.property,
          constraints: error.constraints ? Object.values(error.constraints) : [],
        }))
      : [];

    res.status(400).json({
      message: 'Query validation failed',
      errors: formattedErrors,
    });
  }
};

// Pagination query DTO with strict validation
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

// Validation utility to create consistent error responses
export const _createValidationErrorResponse = (
  errors: ValidationError[]
): { message: string; errors: FormattedValidationError[] } => ({
  message: 'Validation failed',
  errors: errors.map((error) => ({
    property: error.property,
    constraints: error.constraints ? Object.values(error.constraints) : [],
  })),
});
