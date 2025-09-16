import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { PenugasanService } from './penugasan.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { AssignPembimbingDto } from './dto/assign-pembimbing.dto';
import { TugasAkhir, PeranDosenTa } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('penugasan')
export class PenugasanController {
  constructor(private readonly penugasanService: PenugasanService) {}

  @Get('unassigned')
  @Roles(Role.admin, Role.kajur)
  findUnassigned(): Promise<TugasAkhir[]> {
    return this.penugasanService.findUnassignedTugasAkhir();
  }

  @Post(':tugasAkhirId/assign')
  @Roles(Role.admin, Role.kajur)
  assign(
    @Param('tugasAkhirId', ParseIntPipe) tugasAkhirId: number,
    @Body() assignPembimbingDto: AssignPembimbingDto,
  ): Promise<PeranDosenTa[]> {
    return this.penugasanService.assignPembimbing(tugasAkhirId, assignPembimbingDto);
  }
}
