import { Module } from '@nestjs/common';
import { PenugasanService } from './penugasan.service';
import { PenugasanController } from './penugasan.controller';
import { PrismaModule } from '@repo/db';

@Module({
  imports: [PrismaModule],
  controllers: [PenugasanController],
  providers: [PenugasanService],
})
export class PenugasanModule {}
