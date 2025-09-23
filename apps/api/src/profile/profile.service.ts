import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  constructor(private usersService: UsersService) {}

  async getProfile(userId: number): Promise<Partial<User>> {
    // Use the existing service to find the user
    const user = await this.usersService.findUserById(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: number, dto: UpdateProfileDto): Promise<User> {
    const userData: Prisma.UserUpdateInput = {};

    if (dto.name) {
      userData.name = dto.name;
    }

    if (dto.password) {
      userData.password = await bcrypt.hash(dto.password, 10);
    }

    // We can't use the generic update method from UsersService as it has admin-level logic.
    // We need a specific method here or call prisma directly.
    // For now, let's use a direct prisma call via the usersService to keep it consistent.
    return this.usersService.updateUser(userId, userData);
  }
}
