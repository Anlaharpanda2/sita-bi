import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { RuanganService } from '../services/ruangan.service';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/roles.middleware';
import { Role } from '@repo/types';

const router: Router = Router();
const ruanganService = new RuanganService();

router.get(
  '/',
  asyncHandler(jwtAuthMiddleware),
  authorizeRoles([Role.admin]),
  asyncHandler(async (req, res) => {
    const ruangan = await ruanganService.findAll();
    res.status(200).json({ status: 'sukses', data: ruangan });
  }),
);

export default router;
