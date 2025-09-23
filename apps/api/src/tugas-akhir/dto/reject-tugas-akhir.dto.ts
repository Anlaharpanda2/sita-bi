import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class RejectTugasAkhirDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  alasan_penolakan: string;
}
