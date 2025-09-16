import { Module } from '@nestjs/common';
import { PenilaianController } from './penilaian.controller';
import { PenilaianService } from './penilaian.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PenilaianController],
  providers: [PenilaianService],
})
export class PenilaianModule {}
