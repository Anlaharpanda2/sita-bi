import { Injectable } from '@nestjs/common';
import { PeranDosen, StatusTugasAkhir, TugasAkhir } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AssignPembimbingDto } from './dto/assign-pembimbing.dto';

@Injectable()
export class PenugasanService {
  constructor(private prisma: PrismaService) {}

  /**
   * Finds approved Tugas Akhir that do not have any supervisors assigned yet.
   */
  async findUnassignedTugasAkhir(): Promise<TugasAkhir[]> {
    return this.prisma.tugasAkhir.findMany({
      where: {
        status: StatusTugasAkhir.DISETUJUI,
        peranDosenTa: {
          none: { // The TA has no related PeranDosenTa records
            peran: {
              in: [PeranDosen.pembimbing1, PeranDosen.pembimbing2]
            }
          },
        },
      },
      include: {
        mahasiswa: { include: { user: true } },
      },
      orderBy: {
        updated_at: 'asc',
      },
    });
  }

  /**
   * Assigns supervisors to a given Tugas Akhir.
   * It uses `upsert` to create or update the supervisor roles.
   */
  async assignPembimbing(tugasAkhirId: number, dto: AssignPembimbingDto) {
    const { pembimbing1Id, pembimbing2Id } = dto;

    const queries = [];

    // Prepare query for Pembimbing 1
    queries.push(
      this.prisma.peranDosenTa.upsert({
        where: { tugas_akhir_id_peran: { tugas_akhir_id: tugasAkhirId, peran: PeranDosen.pembimbing1 } },
        update: { dosen_id: pembimbing1Id },
        create: { tugas_akhir_id: tugasAkhirId, dosen_id: pembimbing1Id, peran: PeranDosen.pembimbing1 },
      }),
    );

    // Prepare query for Pembimbing 2 if provided
    if (pembimbing2Id) {
      queries.push(
        this.prisma.peranDosenTa.upsert({
          where: { tugas_akhir_id_peran: { tugas_akhir_id: tugasAkhirId, peran: PeranDosen.pembimbing2 } },
          update: { dosen_id: pembimbing2Id },
          create: { tugas_akhir_id: tugasAkhirId, dosen_id: pembimbing2Id, peran: PeranDosen.pembimbing2 },
        }),
      );
    }

    // Execute all queries in a single transaction
    return this.prisma.$transaction(queries);
  }
}
