import { Module } from '@nestjs/common';
import { BimbinganController } from './bimbingan.controller';
import { BimbinganService } from './bimbingan.service';
import { PrismaModule } from '@repo/db';

@Module({
  imports: [PrismaModule],
  controllers: [BimbinganController],
  providers: [BimbinganService],
})
export class BimbinganModule {}
