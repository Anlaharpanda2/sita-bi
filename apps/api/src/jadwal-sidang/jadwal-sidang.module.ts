import { Module } from '@nestjs/common';
import { JadwalSidangController } from './jadwal-sidang.controller';
import { JadwalSidangService } from './jadwal-sidang.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JadwalSidangController],
  providers: [JadwalSidangService],
})
export class JadwalSidangModule {}
