import { PartialType } from '@nestjs/mapped-types';
import { CreateContohPrismaDto } from './create-contoh-prisma.dto';

export class UpdateContohPrismaDto extends PartialType(CreateContohPrismaDto) {}
