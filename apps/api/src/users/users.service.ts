import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<Prisma.UserGetPayload<{ include: { roles: true } }> | null> {
    return this.prisma.user.findUnique({ where: { email }, include: { roles: true } });
  }

  async findUserById(id: number): Promise<Prisma.UserGetPayload<{ include: { roles: true, mahasiswa: true, dosen: true } }> | null> {
    return this.prisma.user.findUnique({ where: { id }, include: { roles: true, mahasiswa: true, dosen: true } });
  }

  async createMahasiswa(data: Prisma.UserCreateInput, profileData: { nim: string, prodi: any, kelas: string, angkatan: string }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        roles: {
          connect: { name: 'mahasiswa' },
        },
        mahasiswa: {
          create: {
            nim: profileData.nim,
            prodi: profileData.prodi,
            angkatan: profileData.angkatan,
            kelas: profileData.kelas,
          },
        },
      },
      include: {
        mahasiswa: true,
      },
    });
  }

  async createDosen(dto: CreateDosenDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const rolesToConnect = dto.roles?.map(roleName => ({ name: roleName })) || [];

    if (!dto.roles?.includes('dosen')) {
      rolesToConnect.push({ name: 'dosen' });
    }

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        roles: {
          connect: rolesToConnect,
        },
        dosen: {
          create: {
            nidn: dto.nidn,
          },
        },
      },
      include: {
        dosen: true,
        roles: true,
      },
    });
  }

  async updateDosen(id: number, dto: UpdateDosenDto): Promise<User> {
    const userData: Prisma.UserUpdateInput = {};

    if (dto.name) userData.name = dto.name;
    if (dto.email) userData.email = dto.email;
    if (dto.password) userData.password = await bcrypt.hash(dto.password, 10);
    if (dto.roles) {
      userData.roles = {
        set: dto.roles.map(roleName => ({ name: roleName }))
      };
    }
    if (dto.nidn) {
      userData.dosen = {
        update: { nidn: dto.nidn },
      };
    }

    return this.prisma.user.update({
      where: { id },
      data: userData,
      include: { dosen: true, roles: true },
    });
  }

  async updateMahasiswa(id: number, dto: UpdateMahasiswaDto): Promise<User> {
    const userData: Prisma.UserUpdateInput = {};
    const mahasiswaData: Prisma.MahasiswaUpdateInput = {};

    if (dto.name) userData.name = dto.name;
    if (dto.email) userData.email = dto.email;
    if (dto.password) userData.password = await bcrypt.hash(dto.password, 10);
    
    if (dto.nim) mahasiswaData.nim = dto.nim;
    if (dto.prodi) mahasiswaData.prodi = dto.prodi;
    if (dto.angkatan) mahasiswaData.angkatan = dto.angkatan;
    if (dto.kelas) mahasiswaData.kelas = dto.kelas;

    if (Object.keys(mahasiswaData).length > 0) {
      userData.mahasiswa = {
        update: mahasiswaData,
      };
    }

    return this.prisma.user.update({
      where: { id },
      data: userData,
      include: { mahasiswa: true, roles: true },
    });
  }

  async findAllMahasiswa(page: number = 1, limit: number = 30): Promise<{ data: any[], total: number, page: number, limit: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take,
        where: { mahasiswa: { isNot: null } },
        select: {
          id: true,
          name: true,
          email: true,
          mahasiswa: {
            select: {
              nim: true,
              prodi: true,
              angkatan: true,
              kelas: true,
            },
          },
          roles: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          id: 'asc'
        }
      }),
      this.prisma.user.count({ where: { mahasiswa: { isNot: null } } }),
    ]);

    const data = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      nim: user.mahasiswa?.nim,
      prodi: user.mahasiswa?.prodi,
      angkatan: user.mahasiswa?.angkatan,
      kelas: user.mahasiswa?.kelas,
      roles: user.roles.map(r => r.name)
    }));
    
    return { data, total, page, limit };
  }

  async findAllDosen(page: number = 1, limit: number = 30): Promise<{ data: any[], total: number, page: number, limit: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take,
        where: { dosen: { isNot: null } },
        select: {
          id: true,
          name: true,
          email: true,
          dosen: {
            select: {
              nidn: true,
            },
          },
          roles: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          id: 'asc'
        }
      }),
      this.prisma.user.count({ where: { dosen: { isNot: null } } }),
    ]);

    const data = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      nidn: user.dosen?.nidn,
      roles: user.roles.map(r => r.name)
    }));
    
    return { data, total, page, limit };
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.prisma.user.delete({ where: { id } });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
