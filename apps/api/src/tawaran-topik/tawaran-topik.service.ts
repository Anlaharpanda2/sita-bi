import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTawaranTopikDto } from './dto/create-tawaran-topik.dto';

@Injectable()
export class TawaranTopikService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTawaranTopikDto, userId: number) {
    return this.prisma.tawaranTopik.create({
      data: {
        ...dto,
        user_id: userId,
      },
    });
  }

  async findByDosen(userId: number) {
    return this.prisma.tawaranTopik.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
  }

  async findAvailable() {
    return this.prisma.tawaranTopik.findMany({
      where: {
        kuota: {
          gt: 0,
        },
        deleted_at: null, // Assuming soft delete
      },
      include: {
        dosenPencetus: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async applyForTopic(topicId: number, mahasiswaId: number) {
    const topic = await this.prisma.tawaranTopik.findFirst({
      where: { id: topicId, kuota: { gt: 0 }, deleted_at: null },
    });

    if (!topic) {
      throw new NotFoundException('Topic not found or no available quota.');
    }

    const activeTugasAkhir = await this.prisma.tugasAkhir.findFirst({
        where: {
            mahasiswa_id: mahasiswaId,
            NOT: {
                status: {
                    in: ['DIBATALKAN', 'LULUS_DENGAN_REVISI', 'LULUS_TANPA_REVISI', 'SELESAI', 'DITOLAK']
                }
            }
        }
    });

    if (activeTugasAkhir) {
        throw new ConflictException('You already have an active final project.');
    }

    const existingApplication = await this.prisma.historyTopikMahasiswa.findFirst({
        where: { mahasiswa_id: mahasiswaId, status: 'diajukan' }
    });

    if (existingApplication) {
        throw new ConflictException('You already have a pending topic application.');
    }

    return this.prisma.historyTopikMahasiswa.create({
      data: {
        mahasiswa_id: mahasiswaId,
        tawaran_topik_id: topicId,
        status: 'diajukan',
      },
    });
  }

  async getApplicationsForDosen(userId: number) {
    // Find all topics offered by the lecturer
    const lecturerTopics = await this.prisma.tawaranTopik.findMany({
      where: { user_id: userId },
      select: { id: true },
    });

    if (lecturerTopics.length === 0) {
      return [];
    }

    const topicIds = lecturerTopics.map(t => t.id);

    // Find all applications for those topics
    return this.prisma.historyTopikMahasiswa.findMany({
      where: {
        tawaran_topik_id: { in: topicIds },
        status: 'diajukan',
      },
      include: {
        mahasiswa: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
        tawaranTopik: {
          select: { judul_topik: true },
        },
      },
    });
  }

  async approveApplication(applicationId: number, dosenId: number) {
    return this.prisma.$transaction(async (prisma) => {
      const application = await prisma.historyTopikMahasiswa.findUnique({
        where: { id: applicationId },
        include: { tawaranTopik: true, mahasiswa: true },
      });

      if (!application || application.tawaranTopik.user_id !== dosenId) {
        throw new NotFoundException('Application not found or you do not own this topic.');
      }

      if (application.status !== 'diajukan') {
        throw new ConflictException('This application has already been processed.');
      }

      // 1. Update application status
      const updatedApplication = await prisma.historyTopikMahasiswa.update({
        where: { id: applicationId },
        data: { status: 'disetujui' },
      });

      // 2. Decrement topic quota
      await prisma.tawaranTopik.update({
        where: { id: application.tawaran_topik_id },
        data: { kuota: { decrement: 1 } },
      });

      // 3. Create a new TugasAkhir for the student
      await prisma.tugasAkhir.create({
        data: {
          mahasiswa_id: application.mahasiswa_id,
          tawaran_topik_id: application.tawaran_topik_id,
          judul: application.tawaranTopik.judul_topik,
          status: 'DISETUJUI', // Or another initial status
          tanggal_pengajuan: new Date(),
        },
      });

      // 4. Reject other pending applications for this student
      await prisma.historyTopikMahasiswa.updateMany({
        where: {
          mahasiswa_id: application.mahasiswa_id,
          status: 'diajukan',
        },
        data: { status: 'ditolak' },
      });

      return updatedApplication;
    });
  }

  async rejectApplication(applicationId: number, dosenId: number) {
    const application = await this.prisma.historyTopikMahasiswa.findUnique({
      where: { id: applicationId },
      include: { tawaranTopik: true },
    });

    if (!application || application.tawaranTopik.user_id !== dosenId) {
      throw new NotFoundException('Application not found or you do not own this topic.');
    }

    if (application.status !== 'diajukan') {
      throw new ConflictException('This application has already been processed.');
    }

    return this.prisma.historyTopikMahasiswa.update({
      where: { id: applicationId },
      data: { status: 'ditolak' },
    });
  }
}
