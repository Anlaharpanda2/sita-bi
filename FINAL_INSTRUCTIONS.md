# Final Instructions to Fix Login

## 🎯 **The Issue**
Frontend is running but backend is not running, causing "connection refused" error when trying to login.

## 📋 **What I Fixed**
1. **Port Configuration:**
   - Backend moved from port 3000 → 3002 (to avoid conflict)
   - Frontend proxy updated to point to 3002
   - API_URL updated to localhost:3002

2. **Enhanced Server Startup:**
   - Clear console messages when backend starts
   - Shows exact port and health check URL

## 🚀 **Action Required (You)**

### 1. **Start Backend First**
```bash
cd D:\Project\Matkul-Proyek\sita-bi
pnpm dev:backend
```

**Look for these messages:**
```
✅ Backend server running on http://localhost:3002
✅ Health check: http://localhost:3002/health
✅ Ready for frontend connections from port 3001
```

### 2. **If Backend Won't Start**
Check for error messages and run:
```bash
cd packages/db
pnpm run db:generate
```

### 3. **Restart Frontend (if needed)**
If you see proxy errors still, restart frontend:
```bash
# Stop frontend (Ctrl+C), then:
pnpm dev:frontend
```

### 4. **Test Login**
- Go to: http://localhost:3001/login
- Email: `sitabi.pnp@gmail.com`
- Password: `password123`

## ✅ **Expected Result**
- No more "connection refused" errors
- No more "Unexpected token" JSON parsing errors  
- Successful login → redirect to dashboard

## 🔧 **Port Summary**
- **Your Services:** Port 3000 ✅ (unchanged)
- **Frontend:** Port 3001 ✅ (Next.js)
- **Backend:** Port 3002 ✅ (Express API)

## 📞 **If Still Issues**
The problem should be resolved now. The key was:
1. Backend wasn't running (connection refused)
2. Port conflict with your existing service on 3000
3. Frontend couldn't parse HTML error as JSON

**Please start the backend first with `pnpm dev:backend` and look for the success messages above.**