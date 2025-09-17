import { Module } from '@nestjs/common';
import { ContohPrismaService } from './contoh-prisma.service';
import { ContohPrismaController } from './contoh-prisma.controller';
import { PrismaModule } from '@repo/db';

@Module({
  imports: [PrismaModule],
  controllers: [ContohPrismaController],
  providers: [ContohPrismaService],
})
export class ContohPrismaModule {}
