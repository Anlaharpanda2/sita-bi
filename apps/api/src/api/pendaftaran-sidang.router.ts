import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { PendaftaranSidangService } from '../services/pendaftaran-sidang.service';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/roles.middleware';
import { validate } from '../middlewares/validation.middleware';
import { Role } from '../types/roles';
import { rejectPendaftaranSchema } from '../dto/pendaftaran-sidang.dto';
import { uploadSidangFiles } from '../middlewares/upload.middleware';

const router: Router = Router();
const pendaftaranSidangService = new PendaftaranSidangService();

// Apply JWT Auth and Roles Guard globally for this router
// router.use(jwtAuthMiddleware);

router.post(
  '/',
  authorizeRoles([Role.mahasiswa]),
  uploadSidangFiles, // Multer middleware to handle file uploads
  asyncHandler(async (req, res) => {
    const mahasiswaId = req.user?.mahasiswa?.id;
    if (mahasiswaId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User does not have a student profile.' });
      return;
    }
    // req.files will contain the uploaded files after multer processes them
    const pendaftaran = await pendaftaranSidangService.registerForSidang(mahasiswaId, req.files);
    res.status(201).json(pendaftaran);
  })
);

router.get(
  '/pending-approvals',
  authorizeRoles([Role.dosen]),
  asyncHandler(async (req, res) => {
    const dosenId = req.user?.dosen?.id;
    if (dosenId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User does not have a lecturer profile.' });
      return;
    }
    const pendingRegistrations = await pendaftaranSidangService.getPendingRegistrations(dosenId);
    res.status(200).json(pendingRegistrations);
  })
);

router.post(
  '/:id/approve',
  authorizeRoles([Role.dosen]),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Pendaftaran ID is required' });
      return;
    }
    const dosenId = req.user?.dosen?.id;
    if (dosenId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User does not have a lecturer profile.' });
      return;
    }
    const approvedRegistration = await pendaftaranSidangService.approveRegistration(parseInt(id, 10), dosenId);
    res.status(200).json(approvedRegistration);
  })
);

router.post(
  '/:id/reject',
  authorizeRoles([Role.dosen]),
  validate(rejectPendaftaranSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Pendaftaran ID is required' });
      return;
    }
    const dosenId = req.user?.dosen?.id;
    if (dosenId === undefined) {
      res.status(401).json({ message: 'Unauthorized: User does not have a lecturer profile.' });
      return;
    }
    const { catatan } = req.body;
    const rejectedRegistration = await pendaftaranSidangService.rejectRegistration(parseInt(id, 10), dosenId, catatan);
    res.status(200).json(rejectedRegistration);
  })
);

export default router;
