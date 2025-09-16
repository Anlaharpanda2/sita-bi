import { Controller, Post, Body, UseGuards, Request, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { TugasAkhirService } from './tugas-akhir.service';
import { CreateTugasAkhirDto } from './dto/create-tugas-akhir.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { TugasAkhirGuard } from './guards/tugas-akhir.guard';
import { RejectTugasAkhirDto } from './dto/reject-tugas-akhir.dto';
import { TugasAkhir } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tugas-akhir')
export class TugasAkhirController {
  constructor(private readonly tugasAkhirService: TugasAkhirService) {}

  @Post()
  @Roles(Role.mahasiswa)
  create(@Body() createTugasAkhirDto: CreateTugasAkhirDto, @Request() req): Promise<TugasAkhir> {
    const userId = req.user.id;
    return this.tugasAkhirService.create(createTugasAkhirDto, userId);
  }

  @Get('validasi')
  @Roles(Role.admin, Role.kajur, Role.kaprodi_d3, Role.kaprodi_d4)
  findAllForValidation(@Request() req): Promise<TugasAkhir[]> {
    return this.tugasAkhirService.findAllForValidation(req.user);
  }

  @Patch(':id/approve')
  @UseGuards(TugasAkhirGuard)
  @Roles(Role.admin, Role.kajur, Role.kaprodi_d3, Role.kaprodi_d4)
  approve(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<TugasAkhir> {
    const approverId = req.user.id;
    return this.tugasAkhirService.approve(id, approverId);
  }

  @Patch(':id/reject')
  @UseGuards(TugasAkhirGuard)
  @Roles(Role.admin, Role.kajur, Role.kaprodi_d3, Role.kaprodi_d4)
  reject(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() rejectDto: RejectTugasAkhirDto,
  ): Promise<TugasAkhir> {
    const rejecterId = req.user.id;
    return this.tugasAkhirService.reject(id, rejecterId, rejectDto.alasan_penolakan);
  }

  @Post(':id/cek-kemiripan')
  @Roles(Role.admin, Role.kajur, Role.kaprodi_d3, Role.kaprodi_d4)
  cekKemiripan(@Param('id', ParseIntPipe) id: number) {
    return this.tugasAkhirService.cekKemiripan(id);
  }
}
