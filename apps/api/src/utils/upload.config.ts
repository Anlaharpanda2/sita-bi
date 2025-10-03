import * as path from 'path';
import * as fs from 'fs';

export interface UploadConfig {
  uploadsDir: string;
  maxFileSize: number;
  allowedFileTypes: string[];
}

export const uploadConfig: UploadConfig = {
  uploadsDir: process.env.UPLOADS_DIR ?? 'uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE ?? '5242880', 10), // 5MB default
  allowedFileTypes: process.env.ALLOWED_FILE_TYPES?.split(',') ?? [
    'jpeg',
    'jpg',
    'png',
    'gif',
    'pdf',
    'doc',
    'docx',
  ],
};

// Utility function untuk mendapatkan monorepo root path
export const getMonorepoRoot = (): string => {
  // Dari apps/api, naik 2 level untuk sampai ke monorepo root
  const currentDir = process.cwd();
  
  // Jika kita di apps/api, naik 2 level
  if (currentDir.includes(path.join('apps', 'api'))) {
    return path.resolve(currentDir, '../..');
  }
  
  // Jika sudah di monorepo root atau lokasi lain
  return currentDir;
};

// Utility function untuk membuat directory jika belum ada
export const ensureDirectoryExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Utility function untuk mendapatkan path upload lengkap di monorepo root
export const getUploadPath = (subDir?: string): string => {
  const monorepoRoot = getMonorerepoRoot();
  const basePath = path.join(monorepoRoot, uploadConfig.uploadsDir);
  
  if (subDir !== undefined && subDir.length > 0) {
    const fullPath = path.join(basePath, subDir);
    ensureDirectoryExists(fullPath);
    return fullPath;
  }
  ensureDirectoryExists(basePath);
  return basePath;
};

// Utility function untuk generate unique filename
export const generateFileName = (originalName: string, prefix?: string): string => {
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1e9);
  const extension = path.extname(originalName);
  const baseName = prefix ?? 'file';
  
  return `${baseName}-${timestamp}-${random}${extension}`;
};

// Utility function untuk mendapatkan relative path untuk database (dari monorepo root)
export const getRelativePath = (fullPath: string): string => {
  const monorepoRoot = getMonorepoRoot();
  return fullPath.replace(monorepoRoot, '').replace(/\\/g, '/');
};

// Utility function untuk mendapatkan URL akses file
export const getFileUrl = (relativePath: string): string => {
  // Remove leading slash if exists and ensure it starts with uploads
  const cleanPath = relativePath.replace(/^\//, '');
  return `/${cleanPath}`;
};

// Utility function untuk mendapatkan absolute path dari relative path
export const getAbsolutePath = (relativePath: string): string => {
  const monorepoRoot = getMonorepoRoot();
  return path.join(monorepoRoot, relativePath.replace(/^\//, ''));
};