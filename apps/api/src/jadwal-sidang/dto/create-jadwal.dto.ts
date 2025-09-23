import { IsInt, IsNotEmpty, IsDateString, IsString, IsArray, ArrayMinSize } from 'class-validator';

export class CreateJadwalDto {
  @IsInt()
  pendaftaranSidangId: number;

  @IsDateString()
  tanggal: string;

  @IsString()
  @IsNotEmpty()
  waktu_mulai: string;

  @IsString()
  @IsNotEmpty()
  waktu_selesai: string;

  @IsInt()
  ruangan_id: number;

  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(2)
  pengujiIds: number[];
}
