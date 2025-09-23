import { Module } from '@nestjs/common';
import { BimbinganController } from './bimbingan.controller';
import { BimbinganService } from './bimbingan.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BimbinganController],
  providers: [BimbinganService],
})
export class BimbinganModule {}
