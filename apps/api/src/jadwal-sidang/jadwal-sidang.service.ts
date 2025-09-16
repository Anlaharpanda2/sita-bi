import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PeranDosen, PendaftaranSidang, Sidang } from '@prisma/client';
import { CreateJadwalDto } from './dto/create-jadwal.dto';

@Injectable()
export class JadwalSidangService {
  constructor(private prisma: PrismaService) {}

  /**
   * For Admins: Get all registrations approved by both supervisors.
   */
  async getApprovedRegistrations(): Promise<PendaftaranSidang[]> {
    return this.prisma.pendaftaranSidang.findMany({
      where: {
        status_pembimbing_1: 'disetujui',
        status_pembimbing_2: 'disetujui',
        status_verifikasi: 'disetujui', // Assuming admin also verifies the files
        sidang: null, // Not yet scheduled
      },
      include: {
        tugasAkhir: {
          include: {
            mahasiswa: { include: { user: true } },
            peranDosenTa: { include: { dosen: { include: { user: true } } } },
          },
        },
      },
    });
  }

  async createJadwal(dto: CreateJadwalDto): Promise<Sidang> {
    const { pendaftaranSidangId, tanggal, waktu_mulai, waktu_selesai, ruangan_id, pengujiIds } = dto;

    return this.prisma.$transaction(async (prisma) => {
      // 1. Find the registration and the related TugasAkhir
      const pendaftaran = await prisma.pendaftaranSidang.findUnique({
        where: { id: pendaftaranSidangId },
        include: { tugasAkhir: true },
      });

      if (!pendaftaran) {
        throw new NotFoundException(`Pendaftaran Sidang with ID ${pendaftaranSidangId} not found.`);
      }

      // 2. Create the Sidang record
      const sidang = await prisma.sidang.create({
        data: {
          tugas_akhir_id: pendaftaran.tugas_akhir_id,
          pendaftaran_sidang_id: pendaftaranSidangId,
          jenis_sidang: 'AKHIR', // Assuming this is for Sidang Akhir
          status_hasil: 'dijadwalkan',
        },
      });

      // 3. Create the JadwalSidang record
      await prisma.jadwalSidang.create({
        data: {
          sidang_id: sidang.id,
          tanggal: new Date(tanggal),
          waktu_mulai: waktu_mulai,
          waktu_selesai: waktu_selesai,
          ruangan_id: ruangan_id,
        },
      });

      // 4. Assign examiners (penguji)
      for (let i = 0; i < pengujiIds.length; i++) {
        await prisma.peranDosenTa.create({
          data: {
            tugas_akhir_id: pendaftaran.tugas_akhir_id,
            dosen_id: pengujiIds[i],
            peran: `penguji${i + 1}` as any, // penguji1, penguji2, etc.
          },
        });
      }

      return sidang;
    });
  }

  async getSidangForPenguji(dosenId: number): Promise<Sidang[]> {
    return this.prisma.sidang.findMany({
      where: {
        tugasAkhir: {
          peranDosenTa: {
            some: {
              dosen_id: dosenId,
              peran: { in: [PeranDosen.penguji1, PeranDosen.penguji2, PeranDosen.penguji3, PeranDosen.penguji4] },
            },
          },
        },
      },
      include: {
        tugasAkhir: { include: { mahasiswa: { include: { user: true } } } },
        jadwalSidang: { include: { ruangan: true } },
        nilaiSidang: { where: { dosen_id: dosenId } }, // Eager load scores given by this examiner
      },
      orderBy: { created_at: 'desc' },
    });
  }
}
