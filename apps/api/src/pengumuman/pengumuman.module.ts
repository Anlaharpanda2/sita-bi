import { Module } from '@nestjs/common';
import { PengumumanController } from './pengumuman.controller';
import { PengumumanService } from './pengumuman.service';
import { PrismaModule } from '@repo/db';

@Module({
  imports: [PrismaModule],
  controllers: [PengumumanController],
  providers: [PengumumanService],
})
export class PengumumanModule {}
