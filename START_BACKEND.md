# Quick Start Backend

## Problem: Backend tidak berjalan sehingga login error

## Quick Fix:

### 1. Start Backend
```bash
cd D:\Project\Matkul-Proyek\sita-bi
pnpm dev:backend
```

### 2. Test Backend Health
```bash
curl http://localhost:3000/health
```

### 3. Test Login Endpoint
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"identifier\":\"sitabi.pnp@gmail.com\",\"password\":\"password123\"}"
```

## Expected Backend Logs:
```
Uploads path: D:\Project\Matkul-Proyek\sita-bi\uploads
Monorepo root: D:\Project\Matkul-Proyek\sita-bi
Server running on port 3000
```

## Frontend Fixed:
- ✅ Using request utility instead of direct fetch
- ✅ Proper error handling for non-JSON responses  
- ✅ Console logging for debugging
- ✅ Import statement corrected

## Test Credentials:
- Email: `sitabi.pnp@gmail.com`
- Password: `password123`

## If Backend Won't Start:
1. Check if Prisma is generated:
   ```bash
   cd packages/db
   pnpm run db:generate
   ```

2. Check if database exists and seeded:
   ```bash  
   cd packages/db
   pnpm run db:seed:admin
   ```

3. Check for TypeScript errors:
   ```bash
   cd apps/api
   pnpm run build
   ```