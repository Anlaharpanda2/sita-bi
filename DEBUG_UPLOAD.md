# Debug Upload Issues

## Masalah yang Ditemukan & Solusi

### 1. **Error HTML5 Form Validation**
```
5An invalid form control with name='file_toeic' is not focusable.
```

**Penyebab:** 
- Input file memiliki `required` attribute tapi `hidden` dengan CSS
- HTML5 validation tidak bisa fokus ke elemen yang disembunyikan

**Solusi:** ✅ Fixed
- Hapus `required` attribute dari input file
- Gunakan custom validation di JavaScript
- Tambahkan `noValidate` pada form

### 2. **API Connection Issues**

**Penyebab yang mungkin:**
- Environment variable `NEXT_PUBLIC_API_URL` tidak terset
- Backend tidak berjalan di port 3000
- CORS issues

**Solusi:** ✅ Fixed
- Fallback untuk API_URL ke `http://localhost:3000`
- Tambahkan logging di API calls
- Pastikan CORS configuration benar

### 3. **FormData Handling**

**Penyebab:**
- Content-Type header di-set manual untuk FormData
- Browser perlu auto-set multipart/form-data dengan boundary

**Solusi:** ✅ Fixed  
- Jangan set Content-Type untuk FormData
- Biarkan browser handle secara otomatis

### 4. **Path Resolution Issues**

**Penyebab:**
- Monorepo root path calculation salah
- Upload directory tidak terbuat

**Solusi:** ✅ Fixed
- Perbaiki `getMonorepoRoot()` function
- Pastikan directory structure benar
- Tambahkan logging untuk debugging

## Testing Steps

### 1. Check Backend Health
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-01-03T13:20:00.000Z",
  "uploadsPath": "D:\\Project\\Matkul-Proyek\\sita-bi\\uploads",
  "monorepoRoot": "D:\\Project\\Matkul-Proyek\\sita-bi"
}
```

### 2. Test File Upload
```bash
curl -X POST http://localhost:3000/api/test-upload \
  -F "file=@test.pdf" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Check Directory Structure
```
sita-bi/
├── uploads/
│   ├── .gitkeep
│   ├── sidang-files/
│   └── test-uploads/
└── apps/api/ (running from here)
```

### 4. Frontend Console Logs
Check browser console for:
- `API_URL configured: http://localhost:3000`
- `Making request to: http://localhost:3000/api/pendaftaran-sidang`
- `Response status: 201` (success) or error details

## Files Changed

### Frontend (`apps/web/`)
- ✅ `app/dashboard/mahasiswa/sidang/page.tsx` - Fixed form validation
- ✅ `lib/api.ts` - Fixed FormData handling
- ✅ `.env` - Added fallback API URL

### Backend (`apps/api/`)
- ✅ `src/utils/upload.config.ts` - Fixed path resolution
- ✅ `src/app.ts` - Added health endpoint & logging
- ✅ `src/middlewares/upload.middleware.ts` - Uses monorepo paths
- ✅ `src/api/test-upload.router.ts` - Updated for monorepo
- ✅ `src/services/pendaftaran-sidang.service.ts` - Fixed file paths

### Root
- ✅ `uploads/` - Created at monorepo root
- ✅ `.gitignore` - Updated for monorepo uploads

## Common Issues & Solutions

### Issue: "Failed to fetch"
- Check if backend is running: `netstat -ano | findstr :3000`
- Check CORS configuration
- Verify API_URL in frontend

### Issue: "File not uploaded"
- Check uploads directory exists and writable
- Verify file size limits (5MB)
- Check allowed file types
- Review multer configuration

### Issue: "Path traversal" security errors
- Ensure files are within uploads directory
- Check path resolution functions
- Verify security validations

## Browser Testing

1. **Open DevTools Network Tab**
2. **Try upload file**
3. **Check request details:**
   - URL: `http://localhost:3000/api/pendaftaran-sidang`
   - Method: POST
   - Content-Type: multipart/form-data
   - Response: 201 Created

## Success Indicators

✅ No HTML5 validation errors  
✅ Network request appears in DevTools  
✅ Backend logs show request received  
✅ File appears in `uploads/sidang-files/`  
✅ Database entry created with correct path  
✅ File accessible via static URL