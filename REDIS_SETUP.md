# Redis Setup dengan Auto-Sync untuk SITA-BI

## Overview

SITA-BI menggunakan **Redis dengan TTL Selamanya + Auto-Sync** dengan SQLite:
- ✅ Cache tidak pernah expired (TTL = 0)
- ✅ Cache otomatis di-invalidate saat data berubah
- ✅ Data selalu sinkron dengan database
- ✅ Performance maksimal dengan data yang selalu fresh

## Arsitektur

```
User Request
    ↓
Auth Middleware
    ↓
Check Redis Cache (TTL selamanya) ← Auto-Invalidate via Prisma Middleware
    ↓                                            ↑
Cache Hit? → Yes → Return cached data            |
    ↓                                            |
    No                                           |
    ↓                                            |
Query SQLite Database                            |
    ↓                                            |
Cache hasil (TTL = 0 = selamanya)                |
    ↓                                            |
Return data                                      |
                                                 |
Database Update (via Prisma) ─────────────────────┘
    ↓
Prisma Middleware auto-clear related cache
    ↓
Next request akan get fresh data dari database
```

## Instalasi Redis

### Windows
1. Download Redis untuk Windows: https://github.com/tporadowski/redis/releases
2. Extract dan jalankan `redis-server.exe`
3. Redis akan berjalan di `localhost:6379`

### Linux/macOS
```bash
# Install Redis
sudo apt install redis-server  # Ubuntu/Debian
brew install redis              # macOS

# Start Redis
redis-server
```

### Docker (Recommended untuk Production)
```bash
# Start Redis dengan persistence enabled
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:alpine redis-server --save 60 1 --loglevel warning

# Enable persistence: save setiap 60 detik jika ada 1+ perubahan
```

## Konfigurasi

### 1. Environment Variables

Tambahkan ke file `.env`:
```env
REDIS_URL=redis://localhost:6379
DATABASE_URL=file:../../../packages/db/prisma/dev.db
```

### 2. Redis Persistence (Optional tapi Recommended)

Untuk memastikan cache tetap ada setelah restart:

```bash
# Buat redis.conf
cat > redis.conf << EOF
# RDB Persistence
save 60 1000   # Save jika ada 1000 perubahan dalam 60 detik
save 300 10    # Save jika ada 10 perubahan dalam 300 detik
save 900 1     # Save jika ada 1 perubahan dalam 900 detik

# AOF Persistence (lebih aman)
appendonly yes
appendfsync everysec
EOF

# Jalankan Redis dengan config
redis-server redis.conf
```

## Cara Kerja Auto-Sync

### 1. Prisma Middleware

Setiap kali ada operasi write (create, update, delete) ke database:

```javascript
// Otomatis terjadi di background:
await prisma.user.update({ 
  where: { id: 1 }, 
  data: { name: 'New Name' } 
});
// ✅ Cache user:1 otomatis dihapus
// ✅ Next request akan get data fresh dari database
```

### 2. Cache Invalidation Rules

| Model | Cache Keys yang Di-invalidate |
|-------|-------------------------------|
| **User** | `user:{id}` |
| **Mahasiswa** | `user:{user_id}` |
| **Dosen** | `user:{user_id}` |
| **Role** | `user:{user_id}` |
| **TugasAkhir** | `tugas_akhir:mahasiswa:{id}*` |
| **Bimbingan** | `bimbingan:ta:{id}*` |

### 3. Flow Lengkap

```javascript
// 1. User login
POST /api/auth/login
→ Query database
→ Cache user (TTL selamanya)
→ Return user data

// 2. User request (cache hit)
GET /api/profile
→ Check cache: ✅ Found
→ Return cached data (super fast!)

// 3. Admin update user
PUT /api/users/1
→ Update database
→ Prisma middleware auto-clear cache:user:1
→ Return updated data

// 4. User request lagi (cache miss)
GET /api/profile
→ Check cache: ❌ Not found (baru di-clear)
→ Query database (fresh data!)
→ Cache lagi (TTL selamanya)
→ Return fresh data
```

## Monitoring Cache

### Check Cache Status
```bash
# Connect to Redis CLI
redis-cli

# List semua cached users
keys "sita:user:*"

# Get specific user cache
get "sita:user:1"

# Check cache TTL (-1 = no expiry)
ttl "sita:user:1"

# Count total cached keys
dbsize

# Get cache info
info stats
```

### Monitor Real-time
```bash
# Monitor all commands
redis-cli monitor

# Get memory usage
redis-cli info memory

# Flush all cache (development only!)
redis-cli flushdb
```

## Performance Metrics

### Dengan Cache (TTL Selamanya):
```
Request ke-1 (cold start): ~50-100ms (database query)
Request ke-2+: ~0.1-0.3ms (Redis cache)

Speed up: 100-500x lebih cepat!
```

### Auto-Sync Overhead:
```
Write operation dengan auto-invalidate: +0.1-0.2ms
Negligible - hampir tidak terasa
```

## Troubleshooting

### Redis Connection Error
```
❌ Redis connection error: connect ECONNREFUSED 127.0.0.1:6379
```
**Solution**: 
- Start Redis: `redis-server`
- Check REDIS_URL in .env
- Verify Redis is running: `redis-cli ping`

### Cache Not Invalidating
```bash
# Manual flush semua cache
redis-cli flushdb

# atau via code
CacheService.flush()
```

### Data Stale (Tidak Sinkron)
Jika data cache tidak sinkron dengan database:
1. Pastikan menggunakan `prisma` dari `config/database.ts`
2. Jangan bypass Prisma (jangan direct SQL)
3. Check Prisma middleware logs

## Development Tips

### 1. Disable Cache untuk Testing
```javascript
// Di .env.test
REDIS_URL=redis://localhost:6380  # Different port
```

### 2. View Cache Stats
```javascript
// Di code
const stats = await CacheService.getStats();
console.log(stats);
```

### 3. Manual Invalidation
```javascript
// Clear specific cache
await CacheService.del('user:1');

// Clear pattern
await CacheService.delPattern('user:*');

// Flush all
await CacheService.flush();
```

## Production Checklist

- [ ] Redis running dengan persistence enabled
- [ ] Backup Redis data regular
- [ ] Monitor cache hit rate
- [ ] Set up Redis Sentinel untuk HA (optional)
- [ ] Configure Redis maxmemory policy
- [ ] Enable Redis AUTH password

## Keuntungan Sistem Ini

✅ **Cache Selamanya**: Tidak perlu worry tentang expiry  
✅ **Selalu Fresh**: Data otomatis sinkron dengan database  
✅ **Zero Maintenance**: Auto-invalidate, tidak perlu manual  
✅ **Performance Maksimal**: Cache hit = super fast  
✅ **Reliable**: Prisma transaction + Redis persistence  
✅ **Scalable**: Bisa add Redis Cluster nanti  

## Resources

- Redis Documentation: https://redis.io/docs/
- Prisma Middleware: https://www.prisma.io/docs/concepts/components/prisma-client/middleware
- ioredis: https://github.com/redis/ioredis
