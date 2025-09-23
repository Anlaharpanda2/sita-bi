import { IsEmail, IsString, MinLength, IsOptional, IsArray, IsIn } from 'class-validator';

const validRoles = ['kajur', 'kaprodi-d3', 'kaprodi-d4', 'dosen'];

export class UpdateDosenDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  @IsOptional()
  @IsString()
  nidn?: string;

  @IsOptional()
  @IsArray()
  @IsIn(validRoles, { each: true })
  roles?: string[];
}
