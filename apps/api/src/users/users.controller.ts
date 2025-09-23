import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, Patch, Query, DefaultValuePipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Protect all routes in this controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('dosen')
  @Roles(Role.admin) // Only users with the 'admin' role can access this
  createDosen(@Body() createDosenDto: CreateDosenDto) {
    return this.usersService.createDosen(createDosenDto);
  }

  @Get('dosen')
  @Roles(Role.admin)
  findAllDosen(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(30), ParseIntPipe) limit: number,
  ) {
    return this.usersService.findAllDosen(page, limit);
  }

  @Get('mahasiswa')
  @Roles(Role.admin)
  findAllMahasiswa(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(30), ParseIntPipe) limit: number,
  ) {
    return this.usersService.findAllMahasiswa(page, limit);
  }

  @Patch('dosen/:id')
  @Roles(Role.admin)
  updateDosen(@Param('id', ParseIntPipe) id: number, @Body() updateDosenDto: UpdateDosenDto) {
    return this.usersService.updateDosen(id, updateDosenDto);
  }

  @Patch('mahasiswa/:id')
  @Roles(Role.admin)
  updateMahasiswa(@Param('id', ParseIntPipe) id: number, @Body() updateMahasiswaDto: UpdateMahasiswaDto) {
    return this.usersService.updateMahasiswa(id, updateMahasiswaDto);
  }

  @Delete(':id')
  @Roles(Role.admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
