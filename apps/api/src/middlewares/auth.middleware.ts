import type { Request, Response, NextFunction } from 'express';
import type { Role } from '@repo/types';
import { CacheService } from '../config/cache';
import prisma from '../config/database';

/**
 * Simple auth middleware menggunakan x-user-id header
 * User ID disimpan di localStorage browser dan dikirim via header
 * Cache TTL = selamanya (0) dan auto-invalidate saat data berubah
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId || typeof userId !== 'string') {
      res.status(401).json({ message: 'Unauthorized: No user ID provided' });
      return;
    }

    const userIdNum = parseInt(userId, 10);
    if (isNaN(userIdNum)) {
      res.status(401).json({ message: 'Unauthorized: Invalid user ID' });
      return;
    }

    // Try to get user from cache first (TTL selamanya)
    const cacheKey = `user:${userIdNum}`;
    let user = await CacheService.get<{
      id: number;
      email: string;
      name: string;
      phone_number: string;
      roles: Array<{ name: string }>;
      dosen: { id: number; nidn: string } | null;
      mahasiswa: { id: number; nim: string } | null;
    }>(cacheKey);

    // If not in cache, fetch from database
    if (!user) {
      console.log(`[DB] Fetching user:${userIdNum} from SQLite (Cache Miss)`);
      const dbUser = await prisma.user.findUnique({
        where: { id: userIdNum },
        include: {
          dosen: true,
          mahasiswa: true,
          roles: true,
        },
      });

      if (!dbUser) {
        res.status(401).json({ message: 'Unauthorized: User not found' });
        return;
      }

      if (dbUser.roles.length === 0) {
        res.status(401).json({ message: 'Unauthorized: User has no roles' });
        return;
      }

      // Store in cache SELAMANYA (TTL = 0)
      // Cache akan otomatis di-invalidate saat ada update via Prisma middleware
      user = {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        phone_number: dbUser.phone_number,
        roles: dbUser.roles.map((r) => ({ name: r.name })),
        dosen: dbUser.dosen
          ? { id: dbUser.dosen.id, nidn: dbUser.dosen.nidn }
          : null,
        mahasiswa: dbUser.mahasiswa
          ? { id: dbUser.mahasiswa.id, nim: dbUser.mahasiswa.nim }
          : null,
      };

      await CacheService.set(cacheKey, user, 0); // TTL 0 = selamanya
    }

    const userRole = user.roles[0];
    if (!userRole) {
      res.status(401).json({ message: 'Unauthorized: User role not found' });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: userRole.name as Role,
      dosen: user.dosen
        ? { 
            id: user.dosen.id, 
            nidn: user.dosen.nidn,
          }
        : null,
      mahasiswa: user.mahasiswa
        ? { 
            id: user.mahasiswa.id, 
            nim: user.mahasiswa.nim,
          }
        : null,
    };

    next();
  } catch (error: unknown) {
    console.error('Auth Middleware Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Keep the old middleware name for backward compatibility
export const insecureAuthMiddleware = authMiddleware;
