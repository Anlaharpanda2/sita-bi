import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Prodi } from '@prisma/client';

export class UpdateMahasiswaDto {
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
  nim?: string;

  @IsOptional()
  @IsEnum(Prodi)
  prodi?: Prodi;

  @IsOptional()
  @IsString()
  angkatan?: string;

  @IsOptional()
  @IsString()
  kelas?: string;
}
