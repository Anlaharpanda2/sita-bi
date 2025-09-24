/// <reference path="../types/express.d.ts" />
import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { BimbinganService } from '../services/bimbingan.service';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/roles.middleware';
import { validate } from '../middlewares/validation.middleware';
import { Role } from '../types/roles';
import { createCatatanSchema, setJadwalSchema } from '../dto/bimbingan.dto';

const router: Router = Router();
const bimbinganService = new BimbinganService();

// Apply JWT Auth and Roles Guard globally for this router


router.get(
  '/sebagai-dosen',
  asyncHandler(async (req, res) => {
    const dosenId = req.user?.dosen?.id;
    if (dosenId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User does not have a lecturer profile.' });
      return;
    }
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const bimbingan = await bimbinganService.getBimbinganForDosen(dosenId, page, limit);
    res.status(200).json(bimbingan);
  })
);

router.get(
  '/sebagai-mahasiswa',
  asyncHandler(async (req, res) => {
    const mahasiswaId = req.user?.mahasiswa?.id;
    if (mahasiswaId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User does not have a student profile.' });
      return;
    }
    const bimbingan = await bimbinganService.getBimbinganForMahasiswa(mahasiswaId);
    res.status(200).json(bimbingan);
  })
);

router.post(
  '/catatan',
  authorizeRoles([Role.dosen, Role.mahasiswa]),
  validate(createCatatanSchema),
  asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (userId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User ID not found.' });
      return;
    }
    const { bimbingan_ta_id, catatan } = req.body;
    const newCatatan = await bimbinganService.createCatatan(bimbingan_ta_id, userId, catatan);
    res.status(201).json(newCatatan);
  })
);

router.post(
  '/:tugasAkhirId/jadwal',
  authorizeRoles([Role.dosen]),
  validate(setJadwalSchema),
  asyncHandler(async (req, res) => {
    const { tugasAkhirId } = req.params;
    if (!tugasAkhirId) {
      res.status(400).json({ message: 'Tugas Akhir ID is required' });
      return;
    }
    const dosenId = req.user?.dosen?.id;
    if (dosenId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User does not have a lecturer profile.' });
      return;
    }
    const { tanggal_bimbingan, jam_bimbingan } = req.body;
    const jadwal = await bimbinganService.setJadwal(parseInt(tugasAkhirId, 10), dosenId, tanggal_bimbingan, jam_bimbingan);
    res.status(201).json(jadwal);
  })
);

router.post(
  '/sesi/:id/cancel',
  authorizeRoles([Role.dosen]),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Session ID is required' });
      return;
    }
    const dosenId = req.user?.dosen?.id;
    if (dosenId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User does not have a lecturer profile.' });
      return;
    }
    const result = await bimbinganService.cancelBimbingan(parseInt(id, 10), dosenId);
    if (result === null) {
      res.status(404).json({ message: 'Supervision session not found or not authorized.' });
      return;
    }
    res.status(200).json({ message: 'Supervision session cancelled.', result });
  })
);

router.post(
  '/sesi/:id/selesaikan',
  authorizeRoles([Role.dosen]),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Session ID is required' });
      return;
    }
    const dosenId = req.user?.dosen?.id;
    if (dosenId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User does not have a lecturer profile.' });
      return;
    }
    const result = await bimbinganService.selesaikanSesi(parseInt(id, 10), dosenId);
    if (result === null) {
      res.status(404).json({ message: 'Supervision session not found or not authorized.' });
      return;
    }
    res.status(200).json({ message: 'Supervision session completed.', result });
  })
);

export default router;
