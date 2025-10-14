import Redis from 'ioredis';

const redisUrl = process.env['REDIS_URL'] || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  lazyConnect: true,
  // Enable Redis persistence
  enableOfflineQueue: true,
});

// Connect to Redis
redis
  .connect()
  .then(() => {
    console.log('✅ Redis connected - TTL selamanya + auto-sync enabled');
  })
  .catch((err) => {
    console.error('❌ Redis connection error:', err.message);
    console.warn('⚠️  Continuing without Redis cache');
  });

// Handle Redis errors
redis.on('error', (err) => {
  console.error('Redis error:', err);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await redis.quit();
  process.exit(0);
});

export default redis;
