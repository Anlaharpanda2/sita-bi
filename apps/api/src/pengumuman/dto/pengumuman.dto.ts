import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { AudiensPengumuman } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePengumumanDto {
  @IsString()
  @IsNotEmpty()
  judul: string;

  @IsString()
  @IsNotEmpty()
  isi: string;

  @IsEnum(AudiensPengumuman)
  audiens: AudiensPengumuman;
}

export class UpdatePengumumanDto extends PartialType(CreatePengumumanDto) {}
