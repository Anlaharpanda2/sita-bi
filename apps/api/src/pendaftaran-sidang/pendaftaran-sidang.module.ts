import { Module } from '@nestjs/common';
import { PendaftaranSidangController } from './pendaftaran-sidang.controller';
import { PendaftaranSidangService } from './pendaftaran-sidang.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PendaftaranSidangController],
  providers: [PendaftaranSidangService],
})
export class PendaftaranSidangModule {}
