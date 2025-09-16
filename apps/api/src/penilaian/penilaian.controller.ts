import { Controller, Post, Get, Body, UseGuards, Request, Param, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { PenilaianService } from './penilaian.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreatePenilaianDto } from './dto/create-penilaian.dto';

@Controller('penilaian')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PenilaianController {
  constructor(private readonly penilaianService: PenilaianService) {}

  @Post()
  @Roles(Role.dosen)
  createNilai(@Body() createPenilaianDto: CreatePenilaianDto, @Request() req) {
    const dosenId = req.user.dosen?.id;
    if (!dosenId) {
      throw new UnauthorizedException('User does not have a lecturer profile.');
    }
    return this.penilaianService.createNilai(createPenilaianDto, dosenId);
  }

  @Get('sidang/:sidangId')
  // Accessible by all authenticated users (dosen, mahasiswa, admin)
  getNilaiForSidang(@Param('sidangId', ParseIntPipe) sidangId: number) {
    // TODO: Add authorization to ensure the user is related to this sidang
    return this.penilaianService.getNilaiForSidang(sidangId);
  }
}
