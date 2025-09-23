import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;
    const take = limit;

    const [logs, total] = await this.prisma.$transaction([
      this.prisma.log.findMany({
        skip,
        take,
        include: { user: { select: { name: true, email: true } } },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.log.count(),
    ]);

    return { data: logs, total, page, limit };
  }
}
