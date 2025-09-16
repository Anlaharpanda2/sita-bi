import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class SetJadwalDto {
  @IsDateString()
  tanggal_bimbingan: string;

  @IsString()
  @IsNotEmpty()
  // TODO: Add a regex validator for HH:mm format
  jam_bimbingan: string;
}
