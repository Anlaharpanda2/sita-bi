import { Controller, Post, Get, Body, UseGuards, Request, Param, ParseIntPipe } from '@nestjs/common';
import { TawaranTopikService } from './tawaran-topik.service';
import { CreateTawaranTopikDto } from './dto/create-tawaran-topik.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('tawaran-topik')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TawaranTopikController {
  constructor(private readonly tawaranTopikService: TawaranTopikService) {}

  @Post()
  @Roles(Role.dosen)
  create(@Body() createTawaranTopikDto: CreateTawaranTopikDto, @Request() req) {
    // req.user is populated by JwtAuthGuard
    return this.tawaranTopikService.create(createTawaranTopikDto, req.user.id);
  }

  @Get()
  @Roles(Role.dosen)
  findByDosen(@Request() req) {
    return this.tawaranTopikService.findByDosen(req.user.id);
  }

  @Get('available')
  @Roles(Role.mahasiswa)
  findAvailable() {
    return this.tawaranTopikService.findAvailable();
  }

  @Get('applications')
  @Roles(Role.dosen)
  getApplications(@Request() req) {
    return this.tawaranTopikService.getApplicationsForDosen(req.user.id);
  }

  @Post('applications/:id/approve')
  @Roles(Role.dosen)
  approveApplication(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.tawaranTopikService.approveApplication(id, req.user.id);
  }

  @Post('applications/:id/reject')
  @Roles(Role.dosen)
  rejectApplication(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.tawaranTopikService.rejectApplication(id, req.user.id);
  }

  @Post(':id/apply')
  @Roles(Role.mahasiswa)
  applyForTopic(@Param('id', ParseIntPipe) id: number, @Request() req) {
    // The user object on the request is from the JWT payload.
    // We need the corresponding Mahasiswa ID.
    const mahasiswaId = req.user.mahasiswa?.id;
    if (!mahasiswaId) {
      throw new Error('User is not a mahasiswa or profile is not loaded.');
    }
    return this.tawaranTopikService.applyForTopic(id, mahasiswaId);
  }
}
