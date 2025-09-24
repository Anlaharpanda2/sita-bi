import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { PenugasanService } from '../services/penugasan.service';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/roles.middleware';
import { validate } from '../middlewares/validation.middleware';
import { Role } from '../types/roles';
import { assignPembimbingSchema } from '../dto/penugasan.dto';

const router: Router = Router();
const penugasanService = new PenugasanService();

// Apply JWT Auth and Roles Guard globally for this router
// router.use(jwtAuthMiddleware);

router.get(
  '/unassigned',
  authorizeRoles([Role.admin, Role.kajur]),
  asyncHandler(async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const unassignedTugasAkhir = await penugasanService.findUnassignedTugasAkhir(page, limit);
    res.status(200).json(unassignedTugasAkhir);
  })
);

router.post(
  '/:tugasAkhirId/assign',
  authorizeRoles([Role.admin, Role.kajur]),
  validate(assignPembimbingSchema),
  asyncHandler(async (req, res) => {
    const { tugasAkhirId } = req.params;
    if (!tugasAkhirId) {
      res.status(400).json({ message: 'Tugas Akhir ID is required' });
      return;
    }
    const assignedPembimbing = await penugasanService.assignPembimbing(parseInt(tugasAkhirId, 10), req.body);
    res.status(200).json(assignedPembimbing);
  })
);

export default router;
