import { PrismaClient } from '@repo/db';
import { CacheService } from './cache';

/**
 * Prisma client dengan auto-invalidate cache extension
 * Setiap kali ada perubahan di database, cache otomatis di-invalidate
 */

/**
 * Invalidate cache based on model and operation
 */
async function invalidateCacheForModel(
  model: string | undefined,
  action: string,
  result: any,
) {
  if (!model) return;

  try {
    switch (model) {
      case 'User':
        await handleUserCacheInvalidation(action, result);
        break;

      case 'Mahasiswa':
        if (result?.user_id) {
          await CacheService.del(`user:${result.user_id}`);
        }
        break;

      case 'Dosen':
        if (result?.user_id) {
          await CacheService.del(`user:${result.user_id}`);
        }
        break;

      case 'Role':
        // Invalidate all user caches jika ada perubahan role
        if (result?.user_id) {
          await CacheService.del(`user:${result.user_id}`);
        }
        break;

      case 'TugasAkhir':
        // Invalidate related caches
        if (result?.mahasiswa_id) {
          await CacheService.delPattern(`tugas_akhir:mahasiswa:${result.mahasiswa_id}*`);
        }
        break;

      case 'Bimbingan':
        if (result?.tugas_akhir_id) {
          await CacheService.delPattern(`bimbingan:ta:${result.tugas_akhir_id}*`);
        }
        break;

      // Tambahkan model lain sesuai kebutuhan
      default:
        console.log(`ℹ️  No cache invalidation rule for model: ${model}`);
    }
  } catch (error) {
    console.error(`Error invalidating cache for ${model}:`, error);
  }
}

/**
 * Handle user cache invalidation
 */
async function handleUserCacheInvalidation(action: string, result: any) {
  if (action === 'deleteMany' || action === 'updateMany') {
    // Untuk operasi batch, clear semua user cache
    await CacheService.delPattern('user:*');
    console.log('♻️  All user caches invalidated (batch operation)');
  } else if (result?.id) {
    // Untuk operasi single, hanya clear user tertentu
    await CacheService.del(`user:${result.id}`);
  }
}

// Create Prisma client with extension for auto-invalidate cache
const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }: any) {
        const before = Date.now();
        const result = await query(args);
        const after = Date.now();

        // Log slow queries (optional - untuk monitoring)
        if (after - before > 1000) {
          console.log(
            `⚠️  Slow query detected: ${model}.${operation} took ${after - before}ms`,
          );
        }

        // Auto-invalidate cache untuk write operations
        const writeOperations = [
          'create',
          'update',
          'delete',
          'upsert',
          'updateMany',
          'deleteMany',
          'createMany',
        ];

        if (writeOperations.includes(operation)) {
          await invalidateCacheForModel(model, operation, result);
        }

        return result;
      },
    },
  },
});

console.log('✅ Prisma client initialized with auto-sync cache extension');

export default prisma;
