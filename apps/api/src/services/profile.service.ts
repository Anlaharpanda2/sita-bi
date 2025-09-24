import { PrismaClient, User, Prisma } from '@repo/db';
import { UpdateProfileDto } from '../dto/profile.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service'; // Will be created next

export class ProfileService {
  private prisma: PrismaClient;
  private usersService: UsersService;

  constructor() {
    this.prisma = new PrismaClient();
    this.usersService = new UsersService(); // Instantiate UsersService
  }

  async getProfile(userId: number): Promise<Partial<User>> {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: number, dto: UpdateProfileDto): Promise<User> {
    const userData: Prisma.UserUpdateInput = {};

    if (dto.name != null) {
      userData.name = dto.name;
    }

    if (dto.password != null) {
      userData.password = await bcrypt.hash(dto.password, 10);
    }

    return this.usersService.updateUser(userId, userData);
  }
}
