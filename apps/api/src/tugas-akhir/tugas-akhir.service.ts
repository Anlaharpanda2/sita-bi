import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTugasAkhirDto } from './dto/create-tugas-akhir.dto';
import { Prisma, StatusTugasAkhir, TugasAkhir } from '@prisma/client';
import * as stringSimilarity from 'string-similarity';

@Injectable()
export class TugasAkhirService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTugasAkhirDto, userId: number): Promise<TugasAkhir> {
    const mahasiswa = await this.prisma.mahasiswa.findUnique({
      where: { user_id: userId },
    });

    if (!mahasiswa) {
      throw new NotFoundException('Profil mahasiswa tidak ditemukan.');
    }

    const activeTugasAkhir = await this.prisma.tugasAkhir.findFirst({
      where: {
        mahasiswa_id: mahasiswa.id,
        NOT: {
          status: {
            in: [StatusTugasAkhir.DIBATALKAN, StatusTugasAkhir.LULUS_DENGAN_REVISI, StatusTugasAkhir.LULUS_TANPA_REVISI, StatusTugasAkhir.SELESAI, StatusTugasAkhir.DITOLAK]
          }
        }
      }
    });

    if (activeTugasAkhir) {
      throw new ConflictException('Anda sudah memiliki Tugas Akhir yang aktif.');
    }

    const existingTitle = await this.prisma.tugasAkhir.findFirst({
        where: { judul: { equals: dto.judul } }
    });

    if (existingTitle) {
        throw new ConflictException(`Judul "${dto.judul}" sudah pernah diajukan.`);
    }

    return this.prisma.tugasAkhir.create({
      data: {
        judul: dto.judul,
        mahasiswa_id: mahasiswa.id,
        status: StatusTugasAkhir.DIAJUKAN,
        tanggal_pengajuan: new Date(),
      },
    });
  }

  async findAllForValidation(user: Prisma.UserGetPayload<{ include: { roles: true } }>): Promise<TugasAkhir[]> {
    const whereClause: Prisma.TugasAkhirWhereInput = {
      status: StatusTugasAkhir.DIAJUKAN,
    };

    const userRoles = user.roles.map(r => r.name);

    if (userRoles.includes('kaprodi_d3')) {
      whereClause.mahasiswa = { prodi: 'D3' };
    } else if (userRoles.includes('kaprodi_d4')) {
      whereClause.mahasiswa = { prodi: 'D4' };
    } else if (!userRoles.includes('admin') && !userRoles.includes('kajur')) {
      // If not a general viewer and not a specific kaprodi, they can see nothing.
      return [];
    }
    // Admins and Kajur have no prodi filter, they see all.

    return this.prisma.tugasAkhir.findMany({
      where: whereClause,
      include: { mahasiswa: { include: { user: true } } },
      orderBy: { tanggal_pengajuan: 'asc' },
    });
  }

  async approve(id: number, approverId: number): Promise<TugasAkhir> {
    await this.findTugasAkhirById(id); // Ensure it exists
    return this.prisma.tugasAkhir.update({
      where: { id },
      data: {
        status: StatusTugasAkhir.DISETUJUI,
        disetujui_oleh: approverId,
        ditolak_oleh: null,
        alasan_penolakan: null,
      },
    });
  }

  async reject(id: number, rejecterId: number, alasan: string): Promise<TugasAkhir> {
    await this.findTugasAkhirById(id); // Ensure it exists
    return this.prisma.tugasAkhir.update({
      where: { id },
      data: {
        status: StatusTugasAkhir.DITOLAK,
        ditolak_oleh: rejecterId,
        alasan_penolakan: alasan,
        disetujui_oleh: null,
      },
    });
  }

  async cekKemiripan(id: number): Promise<any> {
    const targetTa = await this.findTugasAkhirById(id);
    const allOtherTa = await this.prisma.tugasAkhir.findMany({
      where: { id: { not: id } },
      select: { id: true, judul: true, mahasiswa: { include: { user: true } } },
    });

    const allTitles = allOtherTa.map(ta => ta.judul);
    const ratings = stringSimilarity.findBestMatch(targetTa.judul, allTitles);

    const results = ratings.ratings
      .filter(rating => rating.rating > 0.3) // Threshold 30%
      .map(rating => {
        const match = allOtherTa.find(ta => ta.judul === rating.target);
        return {
          similarity: rating.rating,
          judul: rating.target,
          mahasiswa: match?.mahasiswa?.user?.name,
          nim: match?.mahasiswa?.nim,
        };
      })
      .sort((a, b) => b.similarity - a.similarity);

    return {
      target: targetTa.judul,
      results,
    };
  }

  async findTugasAkhirById(id: number): Promise<Prisma.TugasAkhirGetPayload<{ include: { mahasiswa: true } }>> {
    const tugasAkhir = await this.prisma.tugasAkhir.findUnique({
      where: { id },
      include: { mahasiswa: true },
    });
    if (!tugasAkhir) {
      throw new NotFoundException(`Tugas Akhir with ID ${id} not found`);
    }
    return tugasAkhir;
  }
}
