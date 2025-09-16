import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePengumumanDto, UpdatePengumumanDto } from './dto/pengumuman.dto';
import { AudiensPengumuman, Pengumuman } from '@prisma/client';

@Injectable()
export class PengumumanService {
  constructor(private prisma: PrismaService) {}

  // For Admins
  async create(dto: CreatePengumumanDto, authorId: number): Promise<Pengumuman> {
    return this.prisma.pengumuman.create({
      data: {
        ...dto,
        dibuat_oleh: authorId,
        tanggal_dibuat: new Date(),
      },
    });
  }

  async findAll(): Promise<Pengumuman[]> {
    return this.prisma.pengumuman.findMany({ orderBy: { tanggal_dibuat: 'desc' } });
  }

  async findOne(id: number): Promise<Pengumuman | null> {
    return this.prisma.pengumuman.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdatePengumumanDto): Promise<Pengumuman> {
    return this.prisma.pengumuman.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Pengumuman> {
    return this.prisma.pengumuman.delete({ where: { id } });
  }

  // For Public
  async findPublic(): Promise<Pengumuman[]> {
    return this.prisma.pengumuman.findMany({
      where: {
        audiens: { in: [AudiensPengumuman.all_users, AudiensPengumuman.guest] },
      },
      orderBy: { tanggal_dibuat: 'desc' },
      take: 10,
    });
  }

  // For Authenticated Users (Mahasiswa)
  async findForMahasiswa(): Promise<Pengumuman[]> {
    return this.prisma.pengumuman.findMany({
      where: {
        audiens: { in: [AudiensPengumuman.all_users, AudiensPengumuman.mahasiswa] },
      },
      orderBy: { tanggal_dibuat: 'desc' },
      take: 10,
    });
  }
}
