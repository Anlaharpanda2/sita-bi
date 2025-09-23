import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateTawaranTopikDto {
  @IsString()
  @IsNotEmpty()
  judul_topik: string;

  @IsString()
  @IsNotEmpty()
  deskripsi: string;

  @IsInt()
  @Min(1)
  kuota: number;
}
