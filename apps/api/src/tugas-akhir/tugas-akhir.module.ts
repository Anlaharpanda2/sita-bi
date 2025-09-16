import { Module } from '@nestjs/common';
import { TugasAkhirService } from './tugas-akhir.service';
import { TugasAkhirController } from './tugas-akhir.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TugasAkhirController],
  providers: [TugasAkhirService],
})
export class TugasAkhirModule {}
