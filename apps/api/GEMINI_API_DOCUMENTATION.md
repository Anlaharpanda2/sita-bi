# Gemini AI Chatbot API Documentation

## Overview
Backend API untuk chatbot menggunakan Google Gemini 2.0 Flash dengan sistem rotasi 10 API keys otomatis.

## Features
- ✅ **Auto API Key Rotation**: Otomatis beralih ke API key berikutnya jika satu key terkena rate limit
- ✅ **10 API Keys Support**: Mendukung hingga 10 API keys untuk high-availability
- ✅ **Rate Limit Detection**: Deteksi otomatis error rate limit (429, quota exceeded)
- ✅ **Error Handling**: Error handling yang comprehensive
- ✅ **Authentication**: Protected endpoints dengan JWT authentication
- ✅ **Public Endpoint**: Endpoint publik untuk testing

## Environment Variables
Tambahkan ke file `apps/api/.env`:

```env
# Gemini AI Configuration (10 API Keys for rotation)
GEMINI_API_KEY_1=your-actual-api-key-1
GEMINI_API_KEY_2=your-actual-api-key-2
GEMINI_API_KEY_3=your-actual-api-key-3
GEMINI_API_KEY_4=your-actual-api-key-4
GEMINI_API_KEY_5=your-actual-api-key-5
GEMINI_API_KEY_6=your-actual-api-key-6
GEMINI_API_KEY_7=your-actual-api-key-7
GEMINI_API_KEY_8=your-actual-api-key-8
GEMINI_API_KEY_9=your-actual-api-key-9
GEMINI_API_KEY_10=your-actual-api-key-10
```

**Note**: Anda dapat menggunakan kurang dari 10 API keys. Service akan otomatis mendeteksi jumlah API key yang valid.

## API Endpoints

### 1. Chat (Protected)
**Endpoint**: `POST /api/gemini/chat`

**Headers**:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "message": "Explain how AI works in a few words"
}
```

**Response Success (200)**:
```json
{
  "success": true,
  "data": {
    "message": "AI response text here...",
    "apiKeyUsed": 1
  }
}
```

**Response Error - Rate Limit (429)**:
```json
{
  "success": false,
  "error": "Anda sudah mencapai limit. Semua API key Gemini telah mencapai batas penggunaan."
}
```

**Response Error - Validation (400)**:
```json
{
  "success": false,
  "error": "Message is required and must be a string"
}
```

### 2. Chat (Public - No Auth)
**Endpoint**: `POST /api/gemini/chat/public`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "message": "Your question here"
}
```

**Response**: Same as protected endpoint

### 3. Get Status (Protected)
**Endpoint**: `GET /api/gemini/status`

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "totalApiKeys": 10,
    "currentApiKeyNumber": 3,
    "message": "Currently using API key #3 out of 10"
  }
}
```

### 4. Reset API Key Rotation (Protected)
**Endpoint**: `POST /api/gemini/reset`

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response**:
```json
{
  "success": true,
  "message": "API key rotation reset to first key"
}
```

## How It Works

### API Key Rotation Logic
1. Service memuat semua API keys dari environment variables
2. Mulai dengan API key pertama (index 0)
3. Saat request gagal karena rate limit:
   - Deteksi error rate limit (status 429 atau message contains "quota"/"rate limit")
   - Pindah ke API key berikutnya secara otomatis
   - Log informasi API key yang digunakan
4. Jika semua API keys sudah dicoba dan semuanya rate limited:
   - Return error: "Anda sudah mencapai limit"
5. Untuk error selain rate limit (misal: invalid request):
   - Langsung throw error tanpa mencoba API key lain

### Example Usage with cURL

**Test Public Endpoint**:
```bash
curl -X POST http://localhost:3002/api/gemini/chat/public \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "Explain how AI works in a few words"
  }'
```

**Test Protected Endpoint**:
```bash
curl -X POST http://localhost:3002/api/gemini/chat \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -d '{
    "message": "What is machine learning?"
  }'
```

**Check Status**:
```bash
curl -X GET http://localhost:3002/api/gemini/status \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

**Reset to First Key**:
```bash
curl -X POST http://localhost:3002/api/gemini/reset \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## Validation Rules
- **Message**: Required, must be string, non-empty
- **Max Length**: 10,000 characters per message
- **Authentication**: JWT token required for protected endpoints

## Error Codes
- `400`: Bad Request (validation error)
- `401`: Unauthorized (invalid/missing JWT token)
- `429`: Too Many Requests (all API keys exhausted)
- `500`: Internal Server Error

## Installation

1. Install axios dependency (already added to package.json):
```bash
cd /path/to/sita-bi
pnpm install
```

2. Configure environment variables in `apps/api/.env`

3. Start the server:
```bash
pnpm dev:backend
```

## Files Created
- `apps/api/src/services/gemini.service.ts` - Service layer with API key rotation logic
- `apps/api/src/api/gemini.router.ts` - Express router with endpoints
- Updated `apps/api/src/app.ts` - Registered gemini router
- Updated `apps/api/.env.example` - Added Gemini API key configuration
- Updated `apps/api/package.json` - Added axios dependency

## Monitoring & Logs

Service akan menampilkan log di console:
- `✅ Loaded X Gemini API key(s)` - Saat startup
- `🔄 Attempting request with API key #X` - Saat mencoba API key
- `✅ Success with API key #X` - Saat berhasil
- `⚠️ API key #X hit rate limit. Trying next key...` - Saat terkena limit
- `❌ All Gemini API keys have reached their limits` - Saat semua key habis

## Best Practices
1. Gunakan minimal 3-5 API keys untuk production
2. Monitor penggunaan API keys melalui Google Cloud Console
3. Set up alerts untuk quota usage
4. Gunakan endpoint public hanya untuk testing/demo
5. Implement rate limiting di frontend untuk mencegah abuse
6. Regularly reset API key rotation jika diperlukan

## Security Notes
- API keys disimpan di environment variables (jangan commit ke git)
- Protected endpoints memerlukan authentication
- Public endpoint bisa dibatasi dengan rate limiting middleware tambahan
- Validasi input message untuk mencegah injection attacks
