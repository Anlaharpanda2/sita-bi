import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PendaftaranSidang, TipeDokumenSidang } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class PendaftaranSidangService {
  constructor(private prisma: PrismaService) {}

  async registerForSidang(mahasiswaId: number, files: any[]): Promise<PendaftaranSidang> {
    const tugasAkhir = await this.prisma.tugasAkhir.findFirst({
      where: { mahasiswa_id: mahasiswaId, status: 'DISETUJUI' }, // Or whatever status is appropriate
    });

    if (!tugasAkhir) {
      throw new NotFoundException('Active and approved final project not found for this student.');
    }

    const existingRegistration = await this.prisma.pendaftaranSidang.findFirst({
      where: { 
        tugas_akhir_id: tugasAkhir.id,
        status_verifikasi: { in: ['menunggu_verifikasi', 'disetujui'] }
      },
    });

    if (existingRegistration) {
      throw new ConflictException('A registration for this final project already exists or is being processed.');
    }

    // TODO: Add more business logic checks (e.g., minimum supervisions)

    const pendaftaran = await this.prisma.pendaftaranSidang.create({
      data: {
        tugas_akhir_id: tugasAkhir.id,
        status_verifikasi: 'menunggu_verifikasi',
      },
    });

    // Handle file uploads
    for (const file of files) {
      // Use a path relative to the project root for more robustness
      const storageDir = path.join(process.cwd(), 'storage', 'sidang_files');
      const uniqueFilename = `${Date.now()}-${file.originalname}`;
      const savePath = path.join(storageDir, uniqueFilename);
      
      try {
        await fs.writeFile(savePath, await file.toBuffer());

        await this.prisma.pendaftaranSidangFile.create({
          data: {
            pendaftaran_sidang_id: pendaftaran.id,
            file_path: path.join('sidang_files', uniqueFilename), // Store relative path
            original_name: file.originalname,
            tipe_dokumen: this.mapFilenameToTipe(file.fieldname), // map fieldname to enum
          },
        });
      } catch (error) {
        console.error('File handling error:', error);
        // Cleanup logic might be needed here
        throw new InternalServerErrorException('Failed to process file uploads.');
      }
    }

    return pendaftaran;
  }

  async getPendingRegistrations(dosenId: number): Promise<PendaftaranSidang[]> {
    return this.prisma.pendaftaranSidang.findMany({
      where: {
        OR: [
          {
            status_pembimbing_1: 'menunggu',
            tugasAkhir: {
              peranDosenTa: {
                some: { dosen_id: dosenId, peran: 'pembimbing1' },
              },
            },
          },
          {
            status_pembimbing_2: 'menunggu',
            tugasAkhir: {
              peranDosenTa: {
                some: { dosen_id: dosenId, peran: 'pembimbing2' },
              },
            },
          },
        ],
      },
      include: {
        tugasAkhir: {
          include: {
            mahasiswa: { include: { user: true } },
          },
        },
      },
    });
  }

  async approveRegistration(pendaftaranId: number, dosenId: number): Promise<PendaftaranSidang> {
    const pendaftaran = await this.prisma.pendaftaranSidang.findUnique({
      where: { id: pendaftaranId },
      include: { tugasAkhir: { include: { peranDosenTa: true } } },
    });

    if (!pendaftaran) {
      throw new NotFoundException('Registration not found.');
    }

    const peran = pendaftaran.tugasAkhir.peranDosenTa.find(p => p.dosen_id === dosenId);
    if (!peran || (peran.peran !== 'pembimbing1' && peran.peran !== 'pembimbing2')) {
      throw new UnauthorizedException('You are not a supervisor for this registration.');
    }

    const updateData = {};
    if (peran.peran === 'pembimbing1') {
      updateData['status_pembimbing_1'] = 'disetujui';
    } else if (peran.peran === 'pembimbing2') {
      updateData['status_pembimbing_2'] = 'disetujui';
    }

    return this.prisma.pendaftaranSidang.update({
      where: { id: pendaftaranId },
      data: updateData,
    });
  }

  async rejectRegistration(pendaftaranId: number, dosenId: number, catatan: string): Promise<PendaftaranSidang> {
    const pendaftaran = await this.prisma.pendaftaranSidang.findUnique({
      where: { id: pendaftaranId },
      include: { tugasAkhir: { include: { peranDosenTa: true } } },
    });

    if (!pendaftaran) {
      throw new NotFoundException('Registration not found.');
    }

    const peran = pendaftaran.tugasAkhir.peranDosenTa.find(p => p.dosen_id === dosenId);
    if (!peran || (peran.peran !== 'pembimbing1' && peran.peran !== 'pembimbing2')) {
      throw new UnauthorizedException('You are not a supervisor for this registration.');
    }

    const updateData = {};
    if (peran.peran === 'pembimbing1') {
      updateData['status_pembimbing_1'] = 'ditolak';
      updateData['catatan_pembimbing_1'] = catatan;
    } else if (peran.peran === 'pembimbing2') {
      updateData['status_pembimbing_2'] = 'ditolak';
      updateData['catatan_pembimbing_2'] = catatan;
    }

    return this.prisma.pendaftaranSidang.update({
      where: { id: pendaftaranId },
      data: updateData,
    });
  }

  private mapFilenameToTipe(fieldname: string): TipeDokumenSidang {
    switch (fieldname) {
      case 'file_ta': return TipeDokumenSidang.NASKAH_TA;
      case 'file_toeic': return TipeDokumenSidang.TOEIC;
      case 'file_rapor': return TipeDokumenSidang.RAPOR;
      case 'file_ijazah': return TipeDokumenSidang.IJAZAH_SLTA;
      case 'file_bebas_jurusan': return TipeDokumenSidang.BEBAS_JURUSAN;
      default: throw new BadRequestException(`Unknown file field name: ${fieldname}`);
    }
  }
}
