import { Controller, Get } from '@nestjs/common';
import { ContohPrismaService } from './contoh-prisma.service';

@Controller('contoh-prisma')
export class ContohPrismaController {
  constructor(private readonly contohPrismaService: ContohPrismaService) {}

  @Get()
  findAll() {
    return this.contohPrismaService.findAll();
  }
}