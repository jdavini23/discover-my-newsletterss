import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError, IsOptional, IsInt, Min, Max } from 'class-validator';

// Validation error interface
interface FormattedValidationError {
  property: string;
  constraints: string[];
}

// Middleware to validate request body against a DTO class
export const validateRequest = <T extends object>(
  dtoClass: ClassConstructor<T>
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dtoObject = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      const formattedErrors = createValidationErrorResponse(errors);
      return res.status(400).json(formattedErrors);
    }

    req.body = dtoObject;
    next();
  } catch (error: unknown) {
    return res.status(500).json({
      message: 'Internal server error during validation',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Middleware to validate query parameters against a DTO class
export const validateQuery = <T extends object>(
  dtoClass: ClassConstructor<T>
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dtoObject = plainToClass(dtoClass, req.query);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      const formattedErrors = createValidationErrorResponse(errors);
      return res.status(400).json(formattedErrors);
    }

    req.query = dtoObject as any;
    next();
  } catch (error: unknown) {
    return res.status(500).json({
      message: 'Internal server error during validation',
      error: error instanceof Error ? error.message : 'Unknown error'
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
function createValidationErrorResponse(
  errors: ValidationError[]
): { message: string; errors: FormattedValidationError[] } {
  const formattedErrors = errors.map(error => ({
    property: error.property,
    constraints: error.constraints ? Object.values(error.constraints) : []
  }));

  return {
    message: 'Validation failed',
    errors: formattedErrors
  };
}
