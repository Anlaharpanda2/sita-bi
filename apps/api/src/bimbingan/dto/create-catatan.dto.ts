import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCatatanDto {
  @IsInt()
  bimbingan_ta_id: number;

  @IsString()
  @IsNotEmpty()
  catatan: string;
}
