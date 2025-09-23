import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const userEmail = emails[0].value;

    let user = await this.prisma.user.findUnique({
      where: { email: userEmail },
      include: { roles: true },
    });

    if (!user) {
      const mahasiswaRole = await this.prisma.role.findUnique({ where: { name: 'mahasiswa' } });
      user = await this.prisma.user.create({
        data: {
          email: userEmail,
          name: `${name.givenName} ${name.familyName}`,
          password: '', // No local password
          photo: photos[0].value,
          email_verified_at: new Date(),
          roles: {
            connect: { id: mahasiswaRole.id },
          },
        },
        include: { roles: true },
      });
    }

    done(null, user);
  }
}