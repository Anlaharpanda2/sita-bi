# Gemini Chatbot API - Quick Start

## 🚀 Setup Cepat

### 1. Konfigurasi API Keys
Edit file `apps/api/.env` dan tambahkan API keys Gemini:

```env
GEMINI_API_KEY_1=AIzaSyAEkt89JQ072XKCwrfwA-dfYCyJA3qhOPs
GEMINI_API_KEY_2=your-second-api-key
GEMINI_API_KEY_3=your-third-api-key
# ... dst sampai GEMINI_API_KEY_10
```

### 2. Install Dependencies
```bash
cd /path/to/sita-bi
pnpm install
```

### 3. Start Server
```bash
pnpm dev:backend
```

## 📡 API Endpoints

### Public Chat (No Auth)
```bash
curl -X POST http://localhost:3002/api/gemini/chat/public \
  -H 'Content-Type: application/json' \
  -d '{"message": "Jelaskan apa itu AI"}'
```

### Protected Chat (With Auth)
```bash
curl -X POST http://localhost:3002/api/gemini/chat \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -d '{"message": "Apa itu machine learning?"}'
```

### Check Status
```bash
curl http://localhost:3002/api/gemini/status \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Reset API Key Rotation
```bash
curl -X POST http://localhost:3002/api/gemini/reset \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## 🧪 Testing
Jalankan test script otomatis:
```bash
cd apps/api
./test-gemini.sh
```

## 🔄 Cara Kerja API Key Rotation

1. **API Key 1** → Request berhasil ✅
2. **API Key 1** → Rate limit ⚠️ → Switch to **API Key 2**
3. **API Key 2** → Request berhasil ✅
4. **API Key 2** → Rate limit ⚠️ → Switch to **API Key 3**
5. ... (berlanjut sampai API Key 10)
6. **Semua API Keys** rate limited ❌ → Return: "Anda sudah mencapai limit"

## 📝 Response Examples

**Success:**
```json
{
  "success": true,
  "data": {
    "message": "AI adalah...",
    "apiKeyUsed": 1
  }
}
```

**All Keys Exhausted:**
```json
{
  "success": false,
  "error": "Anda sudah mencapai limit. Semua API key Gemini telah mencapai batas penggunaan."
}
```

## 📚 Dokumentasi Lengkap
Lihat: `apps/api/GEMINI_API_DOCUMENTATION.md`

## ✅ Features
- ✅ Auto rotation 10 API keys
- ✅ Rate limit detection otomatis
- ✅ JWT authentication
- ✅ Public endpoint untuk testing
- ✅ Comprehensive error handling
- ✅ Logging & monitoring

## 🔧 Files Created
```
apps/api/
├── src/
│   ├── services/gemini.service.ts      # Service layer
│   └── api/gemini.router.ts            # API routes
├── .env.example                         # Config template
├── GEMINI_API_DOCUMENTATION.md         # Full docs
├── GEMINI_QUICK_START.md              # This file
├── test-gemini.sh                      # Test script
└── example-gemini-request.json        # Example request
```
