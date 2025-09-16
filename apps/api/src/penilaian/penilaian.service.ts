import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePenilaianDto } from './dto/create-penilaian.dto';

@Injectable()
export class PenilaianService {
  constructor(private prisma: PrismaService) {}

  async createNilai(dto: CreatePenilaianDto, dosenId: number) {
    const sidang = await this.prisma.sidang.findUnique({
      where: { id: dto.sidang_id },
      include: { tugasAkhir: { include: { peranDosenTa: true } } },
    });

    if (!sidang) {
      throw new NotFoundException('Sidang not found.');
    }

    const isPenguji = sidang.tugasAkhir.peranDosenTa.some(
      p => p.dosen_id === dosenId && p.peran.startsWith('penguji'),
    );

    if (!isPenguji) {
      throw new UnauthorizedException('You are not an examiner for this defense.');
    }

    return this.prisma.nilaiSidang.create({
      data: {
        sidang_id: dto.sidang_id,
        dosen_id: dosenId,
        aspek: dto.aspek,
        skor: dto.skor,
        komentar: dto.komentar,
      },
    });
  }

  async getNilaiForSidang(sidangId: number) {
    return this.prisma.nilaiSidang.findMany({
      where: { sidang_id: sidangId },
      include: { dosen: { include: { user: true } } },
    });
  }
}
