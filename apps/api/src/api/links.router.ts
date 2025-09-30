import { Router } from 'express';
import { LinksService } from '../services/links.service';
import { validate } from '../middlewares/validation.middleware';
import { createLinkSchema, updateLinkSchema } from '../dto/links.dto';
import asyncHandler from 'express-async-handler';

const router: Router = Router();
const linksService = new LinksService();

router.post(
  '/',
  validate(createLinkSchema),
  asyncHandler(async (req, res) => {
    const newLink = await linksService.create(req.body);
    res.status(201).json({ status: 'sukses', data: newLink });
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || undefined;
    const limit = parseInt(req.query.limit as string) || undefined;
    const links = await linksService.findAll(page, limit);
    res.status(200).json({ status: 'sukses', data: links });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ status: 'gagal', message: 'ID Link diperlukan' });
      return;
    }
    const link = await linksService.findOne(parseInt(id, 10));
    if (link == null) {
      res.status(404).json({ status: 'gagal', message: 'Link tidak ditemukan' });
      return;
    }
    res.status(200).json({ status: 'sukses', data: link });
  })
);

router.patch(
  '/:id',
  validate(updateLinkSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ status: 'gagal', message: 'ID Link diperlukan' });
      return;
    }
    const updatedLink = await linksService.update(
      parseInt(id, 10),
      req.body
    );
    if (updatedLink == null) {
      res.status(404).json({ status: 'gagal', message: 'Link tidak ditemukan' });
      return;
    }
    res.status(200).json({ status: 'sukses', data: updatedLink });
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ status: 'gagal', message: 'ID Link diperlukan' });
      return;
    }
    const removedLink = await linksService.remove(parseInt(id, 10));
    if (removedLink == null) {
      res.status(404).json({ status: 'gagal', message: 'Link tidak ditemukan' });
      return;
    }
    res.status(200).json({ status: 'sukses', message: 'Link berhasil dihapus.' });
  })
);

export default router;