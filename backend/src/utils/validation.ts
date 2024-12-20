import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

// Generic class-validator validation function
export async function validateClass<T extends object>(
  classType: ClassConstructor<T>,
  plainObject: Record<string, unknown>
): Promise<T> {
  const classInstance = plainToClass(classType, plainObject);
  const errors = await validate(classInstance);
  
  if (errors.length > 0) {
    throw new Error(
      errors
        .map(error => Object.values(error.constraints || {}).join(', '))
        .join('; ')
    );
  }
  
  return classInstance;
}

// Specific validation schemas
export class UserRegistrationDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string = '';

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string = '';

  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  name: string = '';
}

export class NewsletterPreferencesDto {
  @IsArray({ message: 'Categories must be an array' })
  @ArrayMinSize(1, { message: 'At least one category is required' })
  categories: string[] = [];

  @IsIn(['daily', 'weekly', 'monthly'], { message: 'Invalid frequency' })
  frequency: string = '';
}
