import { IsEmail, IsString, MinLength, IsNotEmpty, IsEnum } from 'class-validator';
import { Prodi } from '@prisma/client';

export class RegisterDto {
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
  nim: string;

  @IsEnum(Prodi)
  @IsNotEmpty()
  prodi: Prodi;

  @IsString()
  @IsNotEmpty()
  kelas: string;
}
