import { Module } from '@nestjs/common';
import { TawaranTopikController } from './tawaran-topik.controller';
import { TawaranTopikService } from './tawaran-topik.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TawaranTopikController],
  providers: [TawaranTopikService],
})
export class TawaranTopikModule {}
