import { Module } from '@nestjs/common';
import { LaporanController } from './laporan.controller';
import { LaporanService } from './laporan.service';
import { PrismaModule } from '@repo/db';

@Module({
  imports: [PrismaModule],
  controllers: [LaporanController],
  providers: [LaporanService],
})
export class LaporanModule {}
