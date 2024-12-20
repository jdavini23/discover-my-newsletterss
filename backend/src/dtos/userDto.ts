import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserRegistrationDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  @MinLength(2)
  name!: string;
}

export class UserLoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
