import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional, IsArray, IsIn } from 'class-validator';

// Define the possible roles a Dosen can have upon creation
const validRoles = ['kajur', 'kaprodi-d3', 'kaprodi-d4', 'dosen'];

export class CreateDosenDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty()
  nidn: string;

  @IsOptional()
  @IsArray()
  @IsIn(validRoles, { each: true })
  roles?: string[]; // e.g., ['dosen', 'kaprodi-d4']
}
