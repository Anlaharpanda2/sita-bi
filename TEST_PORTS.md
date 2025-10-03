# Port Configuration Fix

## Problem
- Frontend running on port 3001 ✅
- Backend configured for port 3000 ❌ (in use)
- Next.js proxy trying to connect to localhost:3000 ❌

## Solution
- Backend moved to port 3002 ✅
- Frontend proxy updated to port 3002 ✅
- API_URL updated to port 3002 ✅

## Updated Configuration

### Backend (apps/api/.env)
```
PORT=3002
```

### Frontend (apps/web/.env)
```
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### Next.js Proxy (apps/web/next.config.js)
```javascript
{
  source: '/api/:path*',
  destination: 'http://localhost:3002/api/:path*',
}
```

## Testing Steps

### 1. Start Backend
```bash
cd D:\Project\Matkul-Proyek\sita-bi
pnpm dev:backend
```
**Expected:** Backend starts on port 3002

### 2. Test Backend Health
```bash
curl http://localhost:3002/health
```
**Expected:** JSON response with status OK

### 3. Test Login Endpoint
```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"identifier\":\"sitabi.pnp@gmail.com\",\"password\":\"password123\"}"
```
**Expected:** JSON response with token

### 4. Restart Frontend (if needed)
```bash
# Stop current frontend (Ctrl+C)
pnpm dev:frontend
```
**Expected:** Frontend on port 3001, proxy to 3002

### 5. Test Login from Browser
- Go to: http://localhost:3001/login
- Use: sitabi.pnp@gmail.com / password123
- **Expected:** Successful login

## Port Summary
- Frontend: http://localhost:3001
- Backend: http://localhost:3002  
- Your services: Port 3000 (unchanged)