
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the storage directory exists
// const storageDir = path.join(process.cwd(), 'storage', 'sidang_files');
// if (!fs.existsSync(storageDir)) {
//   fs.mkdirSync(storageDir, { recursive: true });
// }

const storage = multer.memoryStorage();

// Filter to allow only specific file types if needed
/*
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  // Example: allow only PDFs
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'));
  }
};
*/
// Multer upload configuration for multiple files
import { RequestHandler } from 'express';

// ... (kode lainnya)

export const uploadSidangFiles: RequestHandler = multer({
  storage: storage,
  // fileFilter: fileFilter, // Uncomment to enable file type filtering
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
}).fields([
  { name: 'file_ta', maxCount: 1 },
  { name: 'file_toeic', maxCount: 1 },
  { name: 'file_rapor', maxCount: 1 },
  { name: 'file_ijazah', maxCount: 1 },
  { name: 'file_bebas_jurusan', maxCount: 1 },
]);
