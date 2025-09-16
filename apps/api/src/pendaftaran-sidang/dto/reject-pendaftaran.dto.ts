import { IsString, IsNotEmpty } from 'class-validator';

export class RejectPendaftaranDto {
  @IsString()
  @IsNotEmpty()
  catatan: string;
}
