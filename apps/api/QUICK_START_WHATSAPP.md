# 🚀 WhatsApp Integration - Quick Start

## ✅ Status Integrasi

- ✅ WhatsApp Web.js installed
- ✅ Service created
- ✅ API endpoints ready
- ✅ Backend connected & running on port **3002**
- ✅ Environment variable configured

---

## ⚙️ Konfigurasi Terpusat (Ubah 1 Kali!)

**File: `apps/api/.env`**
```env
PORT=3002
API_URL=http://localhost:3002
WHATSAPP_AUTO_INIT=true
WHATSAPP_NOTIFICATIONS_ENABLED=true
```

**✨ Semua script dan API otomatis menggunakan nilai ini!**

Jika ingin ganti port atau domain:
1. Edit `.env` aja
2. Restart backend
3. Semua script otomatis update!

---

## 🎯 Test Kirim Pesan SEKARANG

**1. Pastikan backend running:**
```bash
# Di terminal 1
pnpm run dev:backend
# Tunggu sampai: ✅ WhatsApp Client is ready!
```

**2. Buka terminal BARU, test kirim pesan:**
```bash
cd D:\Project\Matkul-Proyek\sita-bi\apps\api
node testKirimPesan.js
```

**3. Cek HP 082284184525** - Pesan masuk! 🎉

---

## 📚 API Endpoints

Base URL otomatis dari `.env`: `${API_URL}/api/whatsapp`

### 1. Cek Status
```http
GET /api/whatsapp/status
Header: x-user-id: 1
```

### 2. Kirim Pesan
```http
POST /api/whatsapp/send
Header: x-user-id: 1
Body: {
  "to": "082284184525",
  "message": "Hello!"
}
```

### 3. Broadcast
```http
POST /api/whatsapp/broadcast
Header: x-user-id: 1
Body: {
  "recipients": ["082284184525", "081234567890"],
  "message": "Pengumuman penting!"
}
```

**Lihat dokumentasi lengkap**: `WHATSAPP_INTEGRATION_GUIDE.md`

---

## 💻 Integrasi ke Kode

### Import Service:
```typescript
import { whatsappService } from './services/whatsapp.service';
```

### Kirim Pesan:
```typescript
await whatsappService.sendMessage('082284184525', 'Hello!');
```

### Kirim Notifikasi:
```typescript
await whatsappService.sendNotification('BIMBINGAN_CREATED', {
  dosenPhone: '082284184525',
  tanggal: '20 Jan 2025',
  mahasiswaNama: 'John Doe',
  catatan: 'Pembahasan BAB 1'
});
```

---

## 🔔 Tipe Notifikasi Tersedia

- `BIMBINGAN_CREATED` - Notif bimbingan baru
- `BIMBINGAN_APPROVED` - Bimbingan disetujui
- `SIDANG_SCHEDULED` - Jadwal sidang
- `TUGAS_AKHIR_APPROVED` - TA disetujui
- `PENGUMUMAN_NEW` - Pengumuman baru

---

## 📝 File-file Penting

```
apps/api/
├── .env                                    # ⚙️ KONFIGURASI UTAMA
├── src/
│   ├── services/whatsapp.service.ts       # 🔧 Service WhatsApp
│   ├── api/whatsapp.router.ts             # 🛣️ API Routes
│   ├── contohAja.ts                       # 🧪 Test script TypeScript
│   └── app.ts                             # ✅ Auto-init WhatsApp
├── testKirimPesan.js                      # 🚀 Test script JS (simple)
├── WHATSAPP_INTEGRATION_GUIDE.md          # 📖 Dokumentasi lengkap
├── README_WHATSAPP.md                     # 📱 Panduan singkat
└── QUICK_START_WHATSAPP.md               # ⚡ File ini
```

---

## 🎊 Selesai!

WhatsApp integration sudah siap digunakan!

**Test sekarang:**
```bash
cd D:\Project\Matkul-Proyek\sita-bi\apps\api
node testKirimPesan.js
```

**Next Steps:**
1. ✅ Test kirim pesan ke nomor sendiri
2. ✅ Integrasikan ke service yang butuh notifikasi
3. ✅ Tambahkan nomor HP ke database user
4. ✅ Setup auto-notification di events

---

**🎉 Congratulations! WhatsApp integration is LIVE!**
