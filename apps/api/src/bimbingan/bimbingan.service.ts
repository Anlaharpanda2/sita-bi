import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BimbinganService {
  constructor(private prisma: PrismaService) {}

  /**
   * For Lecturers: Get all students they are supervising.
   */
  async getBimbinganForDosen(dosenId: number) {
    return this.prisma.tugasAkhir.findMany({
      where: {
        peranDosenTa: {
          some: {
            dosen_id: dosenId,
            peran: { in: ['pembimbing1', 'pembimbing2'] },
          },
        },
        NOT: {
            status: { in: ['DIBATALKAN', 'LULUS_DENGAN_REVISI', 'LULUS_TANPA_REVISI', 'SELESAI', 'DITOLAK'] }
        }
      },
      include: {
        mahasiswa: { include: { user: true } },
        bimbinganTa: { orderBy: { created_at: 'desc' } },
      },
    });
  }

  /**
   * For Students: Get their own supervision details.
   */
  async getBimbinganForMahasiswa(mahasiswaId: number) {
    const tugasAkhir = await this.prisma.tugasAkhir.findFirst({
      where: {
        mahasiswa_id: mahasiswaId,
        NOT: {
            status: { in: ['DIBATALKAN', 'LULUS_DENGAN_REVISI', 'LULUS_TANPA_REVISI', 'SELESAI', 'DITOLAK'] }
        }
      },
      include: {
        peranDosenTa: { include: { dosen: { include: { user: true } } } },
        bimbinganTa: { 
            include: { catatan: { include: { author: true } } },
            orderBy: { created_at: 'desc' } 
        },
        pendaftaranSidang: { orderBy: { created_at: 'desc' } },
      },
    });

    if (!tugasAkhir) {
        throw new NotFoundException('Active final project not found.');
    }

    return tugasAkhir;
  }

  async createCatatan(bimbinganTaId: number, authorId: number, catatan: string) {
    // TODO: Add authorization logic to ensure the user (student or lecturer) is part of this bimbingan session.
    return this.prisma.catatanBimbingan.create({
      data: {
        bimbingan_ta_id: bimbinganTaId,
        author_id: authorId,
        catatan: catatan,
        author_type: 'user', // Simplified from Laravel's Dosen/Mahasiswa distinction
      },
    });
  }

  async setJadwal(tugasAkhirId: number, dosenId: number, tanggal: string, jam: string) {
    // TODO: Add authorization to ensure dosenId is a supervisor for this tugasAkhirId
    // TODO: Check for conflicting schedules

    // Find the supervisor role (pembimbing1 or pembimbing2)
    const peranDosen = await this.prisma.peranDosenTa.findFirst({
        where: { tugas_akhir_id: tugasAkhirId, dosen_id: dosenId },
    });

    if (!peranDosen) {
        throw new UnauthorizedException('You are not a supervisor for this final project.');
    }

    return this.prisma.bimbinganTA.create({
      data: {
        tugas_akhir_id: tugasAkhirId,
        dosen_id: dosenId,
        peran: peranDosen.peran,
        tanggal_bimbingan: new Date(tanggal),
        jam_bimbingan: jam,
        status_bimbingan: 'dijadwalkan',
      },
    });
  }

  async cancelBimbingan(bimbinganId: number, dosenId: number) {
    const bimbingan = await this.prisma.bimbinganTA.findFirst({
        where: { id: bimbinganId, dosen_id: dosenId }
    });

    if (!bimbingan) {
        throw new NotFoundException('Supervision session not found or you are not authorized to modify it.');
    }

    return this.prisma.bimbinganTA.update({
        where: { id: bimbinganId },
        data: { status_bimbingan: 'dibatalkan' }
    });
  }

  async selesaikanSesi(bimbinganId: number, dosenId: number) {
    const bimbingan = await this.prisma.bimbinganTA.findFirst({
        where: { id: bimbinganId, dosen_id: dosenId }
    });

    if (!bimbingan) {
        throw new NotFoundException('Supervision session not found or you are not authorized to modify it.');
    }

    return this.prisma.bimbinganTA.update({
        where: { id: bimbinganId },
        data: { status_bimbingan: 'selesai' }
    });
  }
}