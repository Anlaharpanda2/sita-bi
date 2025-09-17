import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { PrismaModule } from '@repo/db';

@Module({
  imports: [PrismaModule],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
