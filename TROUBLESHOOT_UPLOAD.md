# Upload Error 500 Troubleshooting Guide

## Current Status
- Frontend: Getting 500 Internal Server Error
- Backend: Need to check logs for specific error

## Step-by-Step Debugging

### 1. **Check Backend Health**
Open browser/Postman and test:
```
GET http://localhost:3000/health
```
Expected: Status 200 with upload paths

### 2. **Check Database & File System**
```
GET http://localhost:3000/api/debug/check
```
This will show:
- Database connection status
- Directory existence
- Count of users/mahasiswa/tugas_akhir
- Approved thesis data

### 3. **Create Test Data (if needed)**
```
POST http://localhost:3000/api/debug/create-test-data
```
This will create:
- Test mahasiswa user
- Approved tugas akhir for testing

### 4. **Test Simple Upload**
```
POST http://localhost:3000/api/test-upload
Content-Type: multipart/form-data
Body: file=test.pdf
Authorization: Bearer YOUR_TOKEN
```

### 5. **Check Backend Logs**
Start backend with:
```bash
pnpm dev:backend
```

Look for these log patterns:
```
=== UPLOAD MIDDLEWARE START ===
=== PENDAFTARAN SIDANG REQUEST ===
=== REGISTER FOR SIDANG SERVICE ===
```

## Common Issues & Solutions

### Issue 1: Database Connection Error
**Symptoms:** "PrismaClient is not available" or connection errors
**Solution:** 
```bash
cd packages/db
pnpm run db:generate
```

### Issue 2: Directory Not Found
**Symptoms:** ENOENT errors for upload paths
**Check:**
- `uploads/` directory exists at monorepo root
- `uploads/sidang-files/` subdirectory exists
- Write permissions on directories

### Issue 3: No Approved Tugas Akhir
**Symptoms:** "Active and approved final project not found"
**Solution:** Use debug endpoint to create test data

### Issue 4: Multer Configuration Error
**Symptoms:** File upload middleware errors
**Check:**
- File size limits (5MB)
- File type restrictions
- Upload path configuration

### Issue 5: Authentication Issues
**Symptoms:** 401 Unauthorized
**Note:** Authentication is temporarily disabled for testing
**Check:** JWT middleware is commented out

## Debugging Checklist

- [ ] Backend running on port 3000
- [ ] Health endpoint returns 200
- [ ] Debug check shows database connected
- [ ] Upload directories exist and writable
- [ ] Test data exists (mahasiswa + approved thesis)
- [ ] File type is PDF (allowed)
- [ ] File size under 5MB
- [ ] Frontend sending proper FormData
- [ ] No CORS errors in browser

## Expected Backend Logs (Success)

```
=== UPLOAD MIDDLEWARE START ===
File filter check: test.pdf mimetype: application/pdf
Generated filename: file_ta-1234567890-123456789.pdf for original: test.pdf
Files processed by multer: { file_ta: [...] }
=== UPLOAD MIDDLEWARE END ===
=== PENDAFTARAN SIDANG REQUEST ===
Request files: { file_ta: [...] }
Processing registration for mahasiswa ID: 1
=== REGISTER FOR SIDANG SERVICE ===
Looking for approved tugas akhir...
Found tugas akhir: { id: 1, ... }
Creating new pendaftaran...
Processing uploaded files...
Registration completed successfully
```

## Test URLs

After backend starts, test these endpoints:
1. http://localhost:3000/health
2. http://localhost:3000/api/debug/check  
3. http://localhost:3000/api/debug/create-test-data (POST)
4. http://localhost:3000/api/test-upload (POST with file)
5. http://localhost:3000/api/pendaftaran-sidang (POST with files)

## Quick Fix Commands

```bash
# If database issues
cd packages/db && pnpm run db:generate

# If directory issues  
mkdir -p uploads/sidang-files uploads/test-uploads

# If permission issues (Windows)
icacls uploads /grant Everyone:F /T

# Restart backend
pnpm dev:backend
```