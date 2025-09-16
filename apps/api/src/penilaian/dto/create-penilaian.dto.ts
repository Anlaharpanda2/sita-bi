import { IsString, IsNotEmpty, IsInt, IsNumber, Min, Max } from 'class-validator';

export class CreatePenilaianDto {
  @IsInt()
  sidang_id: number;

  @IsString()
  @IsNotEmpty()
  aspek: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  skor: number;

  @IsString()
  @IsNotEmpty()
  komentar: string;
}
