# SITA-BI Authentication & Redis Implementation

## Perubahan Sistem Autentikasi

### Sebelumnya (JWT)
- Menggunakan JWT token untuk autentikasi
- Token disimpan di localStorage dan dikirim via Authorization header
- Token memiliki expiry time
- Memerlukan library `jsonwebtoken`

### Sekarang (Simple User ID Based)
- **Tidak menggunakan JWT** - sistem autentikasi disederhanakan
- **User ID disimpan di localStorage** browser
- User ID dikirim via **x-user-id header** untuk setiap request yang memerlukan autentikasi
- **Session persisten** - user tetap login selama tidak logout secara manual
- **Redis caching** - data user di-cache untuk performa lebih baik

## Implementasi

### Backend Changes

#### 1. Redis Configuration (`src/config/redis.ts`)
```typescript
import Redis from 'ioredis';
export const redis = new Redis(process.env.REDIS_URL);
```

#### 2. Cache Service (`src/config/cache.ts`)
```typescript
export class CacheService {
  static async get<T>(key: string): Promise<T | null>
  static async set(key: string, value: unknown, ttl: number): Promise<boolean>
  static async del(key: string): Promise<boolean>
  static async getOrSet<T>(key: string, fn: () => Promise<T>, ttl: number): Promise<T>
}
```

#### 3. Auth Middleware (`src/middlewares/auth.middleware.ts`)
- Membaca `x-user-id` dari header
- Cek cache Redis terlebih dahulu
- Jika tidak ada di cache, query ke database dan simpan ke cache
- Cache TTL: 1 jam

#### 4. Auth Service (`src/services/auth.service.ts`)
- Login mengembalikan `{ userId, user }` bukan `{ token, user }`
- User data langsung di-cache ke Redis setelah login
- Logout menghapus cache user

### Frontend Changes

#### 1. API Client (`lib/api.ts`)
```typescript
// Otomatis menambahkan x-user-id header dari localStorage
const userId = JSON.parse(localStorage.getItem('user')).id;
headers.append('x-user-id', userId);
```

#### 2. Auth Context (`context/AuthContext.tsx`)
```typescript
// Simplified - no token management
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;  // Just store user in localStorage
  logout: () => void;
  loading: boolean;
}
```

#### 3. Login Page (`app/login/page.tsx`)
```typescript
// Store user ID in localStorage after successful login
const response = await request('/auth/login', {...});
login(response.data.user); // Stores in localStorage
```

## Database Architecture

### Primary Database: SQLite (via Prisma)
- Semua data persistent disimpan di SQLite
- Located di: `packages/db/prisma/dev.db`

### Cache Layer: Redis
- User session data (TTL: 1 jam)
- Frequently accessed data
- Key pattern: `sita:user:{userId}`

## Installation & Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Redis

#### Option A: Docker (Recommended)
```bash
docker run -d -p 6379:6379 --name redis redis:alpine
```

#### Option B: Local Installation
- **Windows**: Download dari https://github.com/tporadowski/redis/releases
- **Linux**: `sudo apt install redis-server`
- **macOS**: `brew install redis`

### 3. Configure Environment
Buat file `.env` di `apps/api`:
```bash
REDIS_URL=redis://localhost:6379
DATABASE_URL=file:../../../packages/db/prisma/dev.db
```

### 4. Start Application
```bash
# Terminal 1: Start Redis (if not using Docker)
redis-server

# Terminal 2: Start Backend
pnpm dev:backend

# Terminal 3: Start Frontend
pnpm dev:frontend
```

## How It Works

### Login Flow
1. User login dengan email/NIM/NIDN dan password
2. Backend validates credentials
3. Backend returns `{ userId, user }` instead of JWT token
4. Frontend stores entire user object in localStorage
5. Backend caches user data in Redis (TTL: 1 hour)

### Authenticated Request Flow
1. Frontend reads user from localStorage
2. Extracts user ID
3. Sends request with `x-user-id` header
4. Backend auth middleware:
   - Checks Redis cache for user data
   - If exists: use cached data (fast!)
   - If not: query database and cache result
5. Request proceeds with `req.user` populated

### Logout Flow
1. User clicks logout
2. Frontend sends logout request with `x-user-id`
3. Backend deletes user cache from Redis
4. Frontend removes user from localStorage
5. Redirect to login page

## Advantages

✅ **Simplicity**: No complex JWT management  
✅ **Performance**: Redis caching makes subsequent requests very fast  
✅ **Persistent Sessions**: User stays logged in even after browser restart  
✅ **Scalability**: Redis can be scaled independently  
✅ **Flexibility**: Easy to add more caching strategies  

## Security Considerations

⚠️ **Important**: This implementation is suitable for internal applications or development environments.

For production:
- Add HTTPS/TLS
- Implement CSRF protection
- Add rate limiting
- Consider adding session timeout
- Implement IP-based access control
- Add request signing/encryption

## Monitoring Redis

### Check Cache Status
```bash
# Connect to Redis CLI
redis-cli

# List all cached users
keys "sita:user:*"

# Get specific user cache
get "sita:user:1"

# Check cache TTL
ttl "sita:user:1"

# Delete specific cache
del "sita:user:1"

# Clear all SITA caches
keys "sita:*" | xargs redis-cli del
```

### Monitor Redis Performance
```bash
# Real-time monitoring
redis-cli monitor

# Get stats
redis-cli info stats
```

## Troubleshooting

### Redis Connection Error
```
❌ Redis connection error: connect ECONNREFUSED 127.0.0.1:6379
⚠️  Continuing without Redis cache
```
**Solution**: Start Redis server or check REDIS_URL in .env

### Cache Not Working
- Check Redis is running: `redis-cli ping` (should return "PONG")
- Verify REDIS_URL in .env
- Check backend logs for Redis errors

### User Data Not Persisting
- Check localStorage in browser DevTools
- Verify API is sending x-user-id header
- Check backend logs for auth middleware errors

## Migration from JWT

Jika Anda memiliki user yang sudah login dengan JWT:

1. User akan otomatis di-logout saat mengakses aplikasi
2. User perlu login ulang
3. Setelah login, user ID akan disimpan di localStorage
4. Tidak perlu migrasi data

## Future Enhancements

- [ ] Add Redis Sentinel for high availability
- [ ] Implement Redis Cluster for horizontal scaling
- [ ] Add more caching strategies (query results, static data)
- [ ] Implement cache warming on application startup
- [ ] Add cache analytics and monitoring dashboard
- [ ] Implement cache versioning for breaking changes
