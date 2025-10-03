# Upload System Migration Guide

## Overview

This document outlines the migration from AWS S3 storage to local file storage system for the SITA-BI application.

## Changes Made

### 1. File Structure Changes

#### Before (AWS S3):
- Files stored in AWS S3 bucket
- Dependencies: `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`, `multer-s3`
- Configuration in environment variables

#### After (Local Storage):
```
monorepo-root/
├── uploads/                    # NEW: Centralized upload directory
│   ├── .gitkeep
│   ├── README.md
│   ├── sidang-files/          # Thesis defense files
│   └── test-uploads/          # Test files
├── apps/
│   ├── api/                   # Backend (no uploads directory)
│   └── web/                   # Frontend
```

### 2. Configuration Changes

#### Environment Variables (`apps/api/.env`):
```env
# REMOVED AWS Configuration:
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_S3_BUCKET_NAME=
# AWS_REGION=

# NEW Upload Configuration:
UPLOADS_DIR=uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=jpeg,jpg,png,gif,pdf,doc,docx
```

#### Dependencies Removed:
- `@aws-sdk/client-s3`
- `@aws-sdk/s3-request-presigner` 
- `multer-s3`
- `@types/multer-s3`

### 3. Code Changes

#### New Utility (`apps/api/src/utils/upload.config.ts`):
- `getMonorepoRoot()` - Gets monorepo root path
- `getUploadPath()` - Gets upload directory path
- `getRelativePath()` - Converts absolute to relative paths
- `getAbsolutePath()` - Converts relative to absolute paths

#### Updated Files:
1. **`apps/api/src/middlewares/upload.middleware.ts`**
   - Uses `multer.diskStorage` instead of `multerS3`
   - Files stored in monorepo `uploads/` directory

2. **`apps/api/src/api/test-upload.router.ts`**
   - Removed S3 client and signed URL generation
   - Returns local file URLs and paths

3. **`apps/api/src/services/pendaftaran-sidang.service.ts`**
   - Stores relative file paths in database
   - Uses local file interface instead of S3File

4. **`apps/api/src/app.ts`**
   - Serves static files from monorepo uploads directory
   - Added `/api/files` route for file management

5. **`apps/api/src/api/files.router.ts`** (NEW)
   - `/api/files/download/*` - Download files with proper headers
   - `/api/files/info/*` - Get file information

### 4. URL Structure

#### File Access URLs:
```
# Direct static access
GET /uploads/{subfolder}/{filename}

# Download with proper headers  
GET /api/files/download/{subfolder}/{filename}

# File information
GET /api/files/info/{subfolder}/{filename}
```

#### Example URLs:
```
# Direct access
http://localhost:3000/uploads/sidang-files/file_ta-1704067200000-123456789.pdf

# Download
http://localhost:3000/api/files/download/sidang-files/file_ta-1704067200000-123456789.pdf

# File info
http://localhost:3000/api/files/info/sidang-files/file_ta-1704067200000-123456789.pdf
```

### 5. Security Features

- **Path Traversal Protection**: Validates file paths are within uploads directory
- **File Type Validation**: Configurable allowed file types
- **File Size Limits**: Configurable maximum file size
- **Unique Filenames**: Timestamp + random number prevents conflicts
- **Directory Isolation**: Files separated by purpose (sidang-files, test-uploads)

### 6. Database Changes

#### Before:
```sql
-- Stored S3 URLs
file_path: "https://bucket.s3.amazonaws.com/file_ta-123456789.pdf"
```

#### After:
```sql  
-- Stored relative paths from monorepo root
file_path: "/uploads/sidang-files/file_ta-1704067200000-123456789.pdf"
```

## Migration Steps for Existing Data

If you have existing S3 files, you'll need to:

1. **Download existing files from S3**
2. **Update database file_path values** from S3 URLs to relative paths
3. **Move files to appropriate subdirectories** in the uploads folder

## Benefits

1. **Cost Savings**: No AWS S3 costs
2. **Simplicity**: No external service dependencies
3. **Control**: Full control over file storage and access
4. **Performance**: Local file access is faster
5. **Development**: Easier local development and testing
6. **Backup**: Standard file system backup procedures

## Production Considerations

1. **Disk Space**: Monitor available disk space
2. **Backup Strategy**: Regular backups of uploads directory
3. **File Cleanup**: Implement policies for old file removal
4. **Performance**: Consider CDN for high traffic scenarios
5. **Security**: Ensure proper file permissions and access controls

## Rollback Plan

To rollback to S3 if needed:

1. Restore removed AWS dependencies in `package.json`
2. Restore AWS configuration in `.env`
3. Revert middleware and service files to use S3
4. Update database paths back to S3 URLs
5. Upload local files back to S3 bucket