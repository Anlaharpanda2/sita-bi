import { Module } from '@nestjs/common';
import { PenilaianController } from './penilaian.controller';
import { PenilaianService } from './penilaian.service';
import { PrismaModule } from '@repo/db';

@Module({
  imports: [PrismaModule],
  controllers: [PenilaianController],
  providers: [PenilaianService],
})
export class PenilaianModule {}
