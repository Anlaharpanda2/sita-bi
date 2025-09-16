import { Controller, Get, Post, Body, UseGuards, Request, UnauthorizedException, Param, ParseIntPipe } from '@nestjs/common';
import { BimbinganService } from './bimbingan.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCatatanDto } from './dto/create-catatan.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { SetJadwalDto } from './dto/set-jadwal.dto';

@Controller('bimbingan')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BimbinganController {
  constructor(private readonly bimbinganService: BimbinganService) {}

  @Get('sebagai-dosen')
  @Roles(Role.dosen)
  getBimbinganForDosen(@Request() req) {
    const dosenId = req.user.dosen?.id;
    if (!dosenId) {
      throw new UnauthorizedException('User does not have a lecturer profile.');
    }
    return this.bimbinganService.getBimbinganForDosen(dosenId);
  }

  @Get('sebagai-mahasiswa')
  @Roles(Role.mahasiswa)
  getBimbinganForMahasiswa(@Request() req) {
    const mahasiswaId = req.user.mahasiswa?.id;
    if (!mahasiswaId) {
      throw new UnauthorizedException('User does not have a student profile.');
    }
    return this.bimbinganService.getBimbinganForMahasiswa(mahasiswaId);
  }

  @Post('catatan')
  @Roles(Role.dosen, Role.mahasiswa)
  createCatatan(@Body() createCatatanDto: CreateCatatanDto, @Request() req) {
    const userId = req.user.id;
    return this.bimbinganService.createCatatan(
      createCatatanDto.bimbingan_ta_id,
      userId,
      createCatatanDto.catatan,
    );
  }

  @Post(':tugasAkhirId/jadwal')
  @Roles(Role.dosen)
  setJadwal(
    @Param('tugasAkhirId', ParseIntPipe) tugasAkhirId: number,
    @Body() setJadwalDto: SetJadwalDto,
    @Request() req,
  ) {
    const dosenId = req.user.dosen?.id;
    if (!dosenId) {
      throw new UnauthorizedException('User does not have a lecturer profile.');
    }
    return this.bimbinganService.setJadwal(
      tugasAkhirId,
      dosenId,
      setJadwalDto.tanggal_bimbingan,
      setJadwalDto.jam_bimbingan,
    );
  }

  @Post('sesi/:id/cancel')
  @Roles(Role.dosen)
  cancelBimbingan(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const dosenId = req.user.dosen?.id;
    if (!dosenId) {
      throw new UnauthorizedException('User does not have a lecturer profile.');
    }
    return this.bimbinganService.cancelBimbingan(id, dosenId);
  }

  @Post('sesi/:id/selesaikan')
  @Roles(Role.dosen)
  selesaikanSesi(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const dosenId = req.user.dosen?.id;
    if (!dosenId) {
      throw new UnauthorizedException('User does not have a lecturer profile.');
    }
    return this.bimbinganService.selesaikanSesi(id, dosenId);
  }
}
