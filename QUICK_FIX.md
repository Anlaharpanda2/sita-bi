# Quick Fix for Login Error

## Problem Summary
- Backend not running (connection refused)
- Frontend proxy fails to connect
- Port 3000 conflict with your services

## Immediate Fix

### Step 1: Generate Prisma Client (if needed)
```bash
cd D:\Project\Matkul-Proyek\sita-bi\packages\db
pnpm run db:generate
```

### Step 2: Start Backend on Port 3002
```bash
cd D:\Project\Matkul-Proyek\sita-bi
pnpm dev:backend
```

**Watch for:**
- ✅ "Uploads path: ..."
- ✅ "Monorepo root: ..."  
- ✅ Server message (should not mention port 3000)

### Step 3: Test Backend
```bash
# Test health endpoint
curl http://localhost:3002/health

# Test auth endpoint
curl -X POST http://localhost:3002/api/auth/login -H "Content-Type: application/json" -d "{\"identifier\":\"sitabi.pnp@gmail.com\",\"password\":\"password123\"}"
```

### Step 4: Restart Frontend (if needed)
If frontend was already running, restart it to pick up new config:
```bash
# In frontend terminal, Ctrl+C then:
pnpm dev:frontend
```

### Step 5: Test Login
- Go to: http://localhost:3001/login
- Login with: sitabi.pnp@gmail.com / password123

## Expected Results
- ✅ No "connection refused" errors
- ✅ Proper JSON responses
- ✅ Successful login and redirect

## If Still Failing
1. Check backend terminal for actual error messages
2. Check browser console for detailed error logs
3. Verify all three ports are correct:
   - Your service: 3000
   - Frontend: 3001  
   - Backend: 3002