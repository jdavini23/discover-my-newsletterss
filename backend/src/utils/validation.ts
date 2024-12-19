import Joi from 'joi';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

// Reusable email validation
export const emailSchema = Joi.string().email().required();

// Generic validation function for Joi schemas
export function validateSchema<T>(data: T, schema: Joi.Schema): void {
  const { error } = schema.validate(data);
  if (error) {
    throw new Error(`Validation Error: ${error.details[0].message}`);
  }
}

// Generic class-validator validation function
export async function validateClass<T extends object>(
  classType: ClassConstructor<T>, 
  plainObject: Record<string, unknown>
): Promise<T> {
  const classInstance = plainToClass(classType, plainObject);
  await validateOrReject(classInstance);
  return classInstance;
}

// Specific validation schemas
export const userRegistrationSchema = Joi.object({
  email: emailSchema,
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(50).required()
});

export const newsletterPreferencesSchema = Joi.object({
  categories: Joi.array().items(Joi.string()).min(1).required(),
  frequency: Joi.string().valid('daily', 'weekly', 'monthly').required()
});

// Example of a class-based validator
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

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
