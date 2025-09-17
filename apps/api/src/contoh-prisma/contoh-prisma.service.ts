import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/db';

@Injectable()
export class ContohPrismaService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return this.prisma.user.findMany();
  }
}