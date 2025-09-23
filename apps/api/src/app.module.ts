import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TugasAkhirModule } from './tugas-akhir/tugas-akhir.module';
import { PenugasanModule } from './penugasan/penugasan.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProfileModule } from './profile/profile.module';
import { TawaranTopikModule } from './tawaran-topik/tawaran-topik.module';
import { BimbinganModule } from './bimbingan/bimbingan.module';
import { PendaftaranSidangModule } from './pendaftaran-sidang/pendaftaran-sidang.module';
import { JadwalSidangModule } from './jadwal-sidang/jadwal-sidang.module';
import { PenilaianModule } from './penilaian/penilaian.module';
import { PengumumanModule } from './pengumuman/pengumuman.module';
import { LogModule } from './log/log.module';
import { LaporanModule } from './laporan/laporan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigService available application-wide
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: false, // true for 465, false for other ports
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: configService.get<string>('MAIL_FROM'),
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    TugasAkhirModule,
    PenugasanModule,
    ProfileModule,
    TawaranTopikModule,
    BimbinganModule,
    PendaftaranSidangModule,
    JadwalSidangModule,
    PenilaianModule,
    PengumumanModule,
    LogModule,
    LaporanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
