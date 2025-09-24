import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { JadwalSidangService } from '../services/jadwal-sidang.service';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/roles.middleware';
import { validate } from '../middlewares/validation.middleware';
import { Role } from '../types/roles';
import { createJadwalSchema } from '../dto/jadwal-sidang.dto';

const router: Router = Router();
const jadwalSidangService = new JadwalSidangService();

// Apply JWT Auth and Roles Guard globally for this router


router.get(
  '/approved-registrations',
  asyncHandler(async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const registrations = await jadwalSidangService.getApprovedRegistrations(page, limit);
    res.status(200).json(registrations);
  })
);

router.post(
  '/',
  authorizeRoles([Role.admin]),
  validate(createJadwalSchema),
  asyncHandler(async (req, res) => {
    const newJadwal = await jadwalSidangService.createJadwal(req.body);
    res.status(201).json(newJadwal);
  })
);

router.get(
  '/for-penguji',
  authorizeRoles([Role.dosen]),
  asyncHandler(async (req, res) => {
    const dosenId = req.user?.dosen?.id;
    if (dosenId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User does not have a lecturer profile.' });
      return;
    }
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const sidang = await jadwalSidangService.getSidangForPenguji(dosenId, page, limit);
    res.status(200).json(sidang);
  })
);

export default router;
