import { Injectable } from '@nestjs/common';
import prisma from '@repo/db';

@Injectable()
export class ContohPrismaService {
  async findAll() {
    return prisma.user.findMany();
  }
}