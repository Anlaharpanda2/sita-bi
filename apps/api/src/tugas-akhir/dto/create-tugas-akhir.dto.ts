import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTugasAkhirDto {
  @IsString()
  @IsNotEmpty()
  judul: string;
}
