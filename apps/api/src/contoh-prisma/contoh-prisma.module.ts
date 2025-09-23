import { Module } from '@nestjs/common';
import { ContohPrismaService } from './contoh-prisma.service';
import { ContohPrismaController } from './contoh-prisma.controller';

@Module({
  controllers: [ContohPrismaController],
  providers: [ContohPrismaService],
})
export class ContohPrismaModule {}
