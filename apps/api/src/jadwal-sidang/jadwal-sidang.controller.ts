import { Controller, Get, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { JadwalSidangService } from './jadwal-sidang.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateJadwalDto } from './dto/create-jadwal.dto';

@Controller('jadwal-sidang')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JadwalSidangController {
  constructor(private readonly jadwalSidangService: JadwalSidangService) {}

  @Get('approved-registrations')
  @Roles(Role.admin) // Or other relevant roles
  getApprovedRegistrations() {
    return this.jadwalSidangService.getApprovedRegistrations();
  }

  @Post()
  @Roles(Role.admin)
  createJadwal(@Body() createJadwalDto: CreateJadwalDto) {
    return this.jadwalSidangService.createJadwal(createJadwalDto);
  }

  @Get('for-penguji')
  @Roles(Role.dosen)
  getSidangForPenguji(@Request() req) {
    const dosenId = req.user.dosen?.id;
    if (!dosenId) {
      throw new UnauthorizedException('User does not have a lecturer profile.');
    }
    return this.jadwalSidangService.getSidangForPenguji(dosenId);
  }
}
