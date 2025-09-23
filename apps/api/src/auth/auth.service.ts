import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  private async generateOtp(email: string): Promise<string> {
    const otp = randomInt(100000, 999999).toString();
    await this.prisma.emailVerificationToken.upsert({
      where: { email },
      update: { token: otp, created_at: new Date() },
      create: { email, token: otp },
    });
    return otp;
  }

  private async sendOtpEmail(user: { email: string, name: string }, otp: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Kode Verifikasi OTP untuk SITA-BI',
      text: `Halo ${user.name},\n\nKode verifikasi OTP Anda adalah: ${otp}\n\nKode ini akan kedaluwarsa dalam 10 menit.\n`,
    });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    console.log('--- DEBUG: User object in validateUser ---', user);

    const isDosen = user.roles.some(role => role.name === 'dosen');

    // Bypass verification for lecturers, but enforce for others (e.g., students)
    if (!isDosen && !user.email_verified_at) {
      throw new UnauthorizedException('Please verify your email before logging in.');
    }

    if (await bcrypt.compare(pass, user.password)) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { name, email, password, nim, prodi, kelas } = registerDto;

    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { mahasiswa: { nim } }] },
    });

    if (existingUser) {
      throw new ConflictException('Email or NIM already exists.');
    }

    const angkatan = '20' + nim.substring(0, 2);

    const user = await this.usersService.createMahasiswa(
      { name, email, password },
      { nim, prodi, kelas, angkatan },
    );

    const otp = await this.generateOtp(user.email);
    await this.sendOtpEmail(user, otp);

    return { message: 'Registration successful. Please check your email for the OTP code.' };
  }

  async verifyOtp(email: string, otp: string): Promise<{ access_token: string }> {
    const verificationToken = await this.prisma.emailVerificationToken.findUnique({
      where: { email, token: otp },
    });

    if (!verificationToken) {
      throw new UnauthorizedException('Invalid or expired OTP.');
    }

    // Check if OTP is expired (e.g., 10 minutes)
    const now = new Date();
    const otpCreatedAt = new Date(verificationToken.created_at);
    if (now.getTime() - otpCreatedAt.getTime() > 10 * 60 * 1000) {
      throw new UnauthorizedException('OTP has expired.');
    }

    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.prisma.user.update({
      where: { email },
      data: { email_verified_at: new Date() },
    });

    await this.prisma.emailVerificationToken.delete({ where: { email } });

    return this.login(user);
  }

  async resendOtp(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }
    if (user.email_verified_at) {
      throw new ConflictException('Email is already verified.');
    }

    const otp = await this.generateOtp(user.email);
    await this.sendOtpEmail(user, otp);

    return { message: 'A new OTP has been sent to your email.' };
  }
}
