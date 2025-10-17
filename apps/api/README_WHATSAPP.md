# 📱 Cara Mengirim WhatsApp - Quick Guide

## ⚙️ Configuration - UBAH 1 KALI SAJA!

**Semua port/URL dikontrol dari `.env` file!**

Edit file `apps/api/.env`:
```env
PORT=3002
API_URL=http://localhost:3002
```

**Cukup ubah 1 kali di `.env`, semua script otomatis menyesuaikan!** ✨

---

## 🎯 3 Cara Mengirim Pesan WhatsApp

### **Cara 1: Script Testing Node.js** ⭐ **RECOMMENDED!**

1. **Pastikan backend running:**
   ```bash
   pnpm run dev:backend
   ```

2. **Buka terminal BARU, jalankan:**
   ```bash
   cd D:\Project\Matkul-Proyek\sita-bi\apps\api
   node testKirimPesan.js
   ```

3. **Selesai!** Pesan akan terkirim ke 082284184525
   - ✅ Otomatis baca PORT dari `.env`
   - ✅ Tidak perlu edit kode!

---

### **Cara 2: Script TypeScript (Full Testing)**

```bash
cd D:\Project\Matkul-Proyek\sita-bi\apps\api
npx ts-node -r tsconfig-paths/register src/contohAja.ts
```

Script akan kirim 4 pesan test berbeda. ✅ Otomatis detect PORT dari environment

---

### **Cara 3: Via API (Postman/curl)**

#### Menggunakan curl (Windows):
```bash
curl -X POST http://localhost:3002/api/whatsapp/send ^
  -H "Content-Type: application/json" ^
  -H "x-user-id: 1" ^
  -d "{\"to\": \"082284184525\", \"message\": \"Hello!\"}"
```

#### Menggunakan Postman:
- **URL**: `POST http://localhost:3002/api/whatsapp/send`
- **Headers**:
  - `Content-Type: application/json`
  - `x-user-id: 1`
- **Body (raw JSON)**:
  ```json
  {
    "to": "082284184525",
    "message": "Hello from SITA-BI!"
  }
  ```

💡 **Tip**: Jika port berubah, cukup edit `.env` saja!

---

## 🔄 Apakah Otomatis Jalan Saat Server Start?

**TIDAK!** Script testing **tidak otomatis** jalan.

### Yang Otomatis:
✅ WhatsApp service initialize saat backend start  
✅ Koneksi WhatsApp tetap aktif selama backend running  
✅ Siap menerima request kirim pesan kapan saja  
✅ Session tersimpan (tidak perlu scan QR lagi)

### Yang Manual:
❌ Script `contohAja.ts` - harus run manual  
❌ Script `testKirimPesan.js` - harus run manual  
❌ Kirim pesan test - harus via API atau script  

---

## 💡 Rekomendasi

### **Untuk Testing Cepat:**
```bash
node testKirimPesan.js
```
✅ Otomatis baca `.env`  
✅ Tidak perlu edit kode

### **Untuk Development:**
Gunakan API endpoints dari kode:
```typescript
import { whatsappService } from './whatsapp.service';
await whatsappService.sendMessage('082284184525', 'Hello!');
```

### **Untuk Production:**
Integrasikan ke existing services (bimbingan, sidang, dll)

---

## 🎯 Quick Test Command

```bash
cd D:\Project\Matkul-Proyek\sita-bi\apps\api && node testKirimPesan.js
```

---

## ⚙️ Mengubah Port/URL - Sekali Edit, Semua Update!

**Cukup edit `.env` sekali:**

```env
# apps/api/.env
PORT=3002                          # Ubah port di sini
API_URL=http://localhost:3002      # Atau domain production
```

**File yang otomatis menyesuaikan:**
- ✅ `testKirimPesan.js` - baca dari `.env`
- ✅ `contohAja.ts` - baca dari environment
- ✅ Server backend - bind ke PORT
- ✅ Health check endpoint

**Tidak perlu edit file lain!** 🎉

---

## ❓ Troubleshooting

### Problem: "Cannot find module 'dotenv'"
**Solution**: Install dependencies
```bash
cd D:\Project\Matkul-Proyek\sita-bi\apps\api
pnpm install
```

### Problem: "fetch is not defined"
**Solution**: Node.js 18+ sudah include fetch. Jika versi lama:
```bash
pnpm add node-fetch@2
```

### Problem: "WhatsApp not ready"
**Solution**: 
1. Pastikan backend running
2. Cek console: "✅ WhatsApp Client is ready!"
3. Scan QR code jika belum

### Problem: "Connection refused"
**Solution**: 
1. Cek PORT di `.env` (harus 3002)
2. Backend running? → `pnpm run dev:backend`
3. Test: `curl http://localhost:3002/health`

---

## 📞 Quick Check

```bash
# 1. Cek backend running
curl http://localhost:3002/health

# 2. Cek WhatsApp status
curl -H "x-user-id: 1" http://localhost:3002/api/whatsapp/status

# 3. Kirim test message
node testKirimPesan.js
```

---

**Happy Testing! 🚀**

**Pro Tip**: Simpan file `.env` yang berbeda untuk development/production, tinggal copy saja!
