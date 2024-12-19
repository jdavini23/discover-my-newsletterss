import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class InterestPreferenceDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;
}

export class UserPreferencesDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterestPreferenceDto)
  interests?: InterestPreferenceDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  newsletterCategories?: string[];

  @IsOptional()
  @IsString()
  frequencyPreference?: string;
}

export class UpdateUserPreferencesDto extends UserPreferencesDto {
  @IsString()
  userId!: string;
}
