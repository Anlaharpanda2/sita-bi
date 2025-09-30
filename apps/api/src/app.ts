import express from 'express';
import cors from 'cors';
import linksRouter from './api/links.router';
import contohPrismaRouter from './api/contoh-prisma.router';
import bimbinganRouter from './api/bimbingan.router';
import jadwalSidangRouter from './api/jadwal-sidang.router';
import laporanRouter from './api/laporan.router';
import logRouter from './api/log.router';
import pendaftaranSidangRouter from './api/pendaftaran-sidang.router';
import pengumumanRouter from './api/pengumuman.router';
import penilaianRouter from './api/penilaian.router';
import penugasanRouter from './api/penugasan.router';
import profileRouter from './api/profile.router';
import tawaranTopikRouter from './api/tawaran-topik.router';
import tugasAkhirRouter from './api/tugas-akhir.router';
import usersRouter from './api/users.router';
import testUploadRouter from './api/test-upload.router'; // Router untuk testing upload S3
import { errorHandler } from './middlewares/error.middleware';

const app: express.Express = express();

// Global Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/links', linksRouter);
app.use('/api/contoh-prisma', contohPrismaRouter);
app.use('/api/bimbingan', bimbinganRouter);
app.use('/api/jadwal-sidang', jadwalSidangRouter);
app.use('/api/laporan', laporanRouter);
app.use('/api/logs', logRouter);
app.use('/api/pendaftaran-sidang', pendaftaranSidangRouter);
app.use('/api/pengumuman', pengumumanRouter);
app.use('/api/penilaian', penilaianRouter);
app.use('/api/penugasan', penugasanRouter);
app.use('/api/profile', profileRouter);
app.use('/api/tawaran-topik', tawaranTopikRouter);
app.use('/api/tugas-akhir', tugasAkhirRouter);
app.use('/api/users', usersRouter);
app.use('/api/test-upload', testUploadRouter); // Rute untuk testing upload S3

// Error Handling Middleware
app.use(errorHandler);

export default app;
