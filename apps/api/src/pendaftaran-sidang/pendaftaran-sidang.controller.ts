import { Controller, Post, Get, Body, UseGuards, Request, UnauthorizedException, Param, ParseIntPipe } from '@nestjs/common';
import { PendaftaranSidangService } from './pendaftaran-sidang.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { RejectPendaftaranDto } from './dto/reject-pendaftaran.dto';

@Controller('pendaftaran-sidang')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PendaftaranSidangController {
  constructor(private readonly pendaftaranSidangService: PendaftaranSidangService) {}

  @Post()
  @Roles(Role.mahasiswa)
  async registerForSidang(@Request() req) {
    const mahasiswaId = req.user.mahasiswa?.id;
    if (!mahasiswaId) {
      throw new UnauthorizedException('User does not have a student profile.');
    }

    const files = [];
    const parts = req.parts();
    for await (const part of parts) {
      if (part.file) {
        // The part object has file, fieldname, filename, encoding, mimetype
        files.push(part);
      } else {
        // Handle other form fields if necessary
      }
    }

    return this.pendaftaranSidangService.registerForSidang(mahasiswaId, files);
  }

  @Get('pending-approvals')
  @Roles(Role.dosen)
  getPendingRegistrations(@Request() req) {
    const dosenId = req.user.dosen?.id;
    if (!dosenId) {
      throw new UnauthorizedException('User does not have a lecturer profile.');
    }
    return this.pendaftaranSidangService.getPendingRegistrations(dosenId);
  }

  @Post(':id/approve')
  @Roles(Role.dosen)
  approveRegistration(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const dosenId = req.user.dosen?.id;
    if (!dosenId) {
      throw new UnauthorizedException('User does not have a lecturer profile.');
    }
    return this.pendaftaranSidangService.approveRegistration(id, dosenId);
  }

  @Post(':id/reject')
  @Roles(Role.dosen)
  rejectRegistration(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() rejectDto: RejectPendaftaranDto,
  ) {
    const dosenId = req.user.dosen?.id;
    if (!dosenId) {
      throw new UnauthorizedException('User does not have a lecturer profile.');
    }
    return this.pendaftaranSidangService.rejectRegistration(id, dosenId, rejectDto.catatan);
  }
}
