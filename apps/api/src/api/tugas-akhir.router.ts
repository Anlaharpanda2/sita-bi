import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { TugasAkhirService } from '../services/tugas-akhir.service';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/roles.middleware';
import { validate } from '../middlewares/validation.middleware';
import { Role } from '../types/roles';
import { createTugasAkhirSchema, rejectTugasAkhirSchema } from '../dto/tugas-akhir.dto';
import { tugasAkhirGuard } from '../middlewares/tugas-akhir.middleware';

const router: Router = Router();
const tugasAkhirService = new TugasAkhirService();

// Apply JWT Auth and Roles Guard globally for this router
// router.use(jwtAuthMiddleware);

router.post(
  '/',
  authorizeRoles([Role.mahasiswa]),
  validate(createTugasAkhirSchema),
  asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (userId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User ID not found.' });
      return;
    }
    const newTugasAkhir = await tugasAkhirService.create(req.body, userId);
    res.status(201).json(newTugasAkhir);
  })
);

router.get(
  '/validasi',
  authorizeRoles([Role.admin, Role.kajur, Role.kaprodi_d3, Role.kaprodi_d4]),
  asyncHandler(async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const tugasAkhirList = await tugasAkhirService.findAllForValidation(req.user!, page, limit);
    res.status(200).json(tugasAkhirList);
  })
);

router.patch(
  '/:id/approve',
  tugasAkhirGuard, // Custom guard for Tugas Akhir
  authorizeRoles([Role.admin, Role.kajur, Role.kaprodi_d3, Role.kaprodi_d4]),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Tugas Akhir ID is required' });
      return;
    }
    const approverId = req.user?.id;
    if (approverId === undefined) {
      res.status(401).json({ message: 'Unauthorized: Approver ID not found.' });
      return;
    }
    const approvedTugasAkhir = await tugasAkhirService.approve(parseInt(id, 10), approverId);
    res.status(200).json(approvedTugasAkhir);
  })
);

router.patch(
  '/:id/reject',
  tugasAkhirGuard, // Custom guard for Tugas Akhir
  authorizeRoles([Role.admin, Role.kajur, Role.kaprodi_d3, Role.kaprodi_d4]),
  validate(rejectTugasAkhirSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Tugas Akhir ID is required' });
      return;
    }
    const rejecterId = req.user?.id;
    if (rejecterId === undefined) {
      res.status(401).json({ message: 'Unauthorized: Rejecter ID not found.' });
      return;
    }
    const { alasan_penolakan } = req.body;
    const rejectedTugasAkhir = await tugasAkhirService.reject(parseInt(id, 10), rejecterId, alasan_penolakan);
    res.status(200).json(rejectedTugasAkhir);
  })
);

router.post(
  '/:id/cek-kemiripan',
  authorizeRoles([Role.admin, Role.kajur, Role.kaprodi_d3, Role.kaprodi_d4]),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Tugas Akhir ID is required' });
      return;
    }
    const kemiripanResult = await tugasAkhirService.cekKemiripan(parseInt(id, 10));
    res.status(200).json(kemiripanResult);
  })
);

export default router;
