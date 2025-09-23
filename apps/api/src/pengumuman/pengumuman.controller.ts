import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { PengumumanService } from './pengumuman.service';
import { CreatePengumumanDto, UpdatePengumumanDto } from './dto/pengumuman.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('pengumuman')
export class PengumumanController {
  constructor(private readonly pengumumanService: PengumumanService) {}

  // --- Admin Routes ---
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  create(@Body() createPengumumanDto: CreatePengumumanDto, @Request() req) {
    return this.pengumumanService.create(createPengumumanDto, req.user.id);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  findAll() {
    return this.pengumumanService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePengumumanDto: UpdatePengumumanDto) {
    return this.pengumumanService.update(id, updatePengumumanDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pengumumanService.remove(id);
  }

  // --- Public/User Routes ---
  @Get('public')
  findPublic() {
    return this.pengumumanService.findPublic();
  }

  @Get('mahasiswa')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.mahasiswa)
  findForMahasiswa() {
    return this.pengumumanService.findForMahasiswa();
  }

  // A single endpoint to get details, could be public or protected based on announcement audience
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // TODO: Add logic to check if user is allowed to see the announcement based on audience
    return this.pengumumanService.findOne(id);
  }
}
