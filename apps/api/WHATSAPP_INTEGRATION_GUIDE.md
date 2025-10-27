# 📱 WhatsApp Integration Guide - SITA-BI

## ✅ Status: Successfully Integrated!

WhatsApp Web.js telah berhasil diintegrasikan ke backend SITA-BI. Sistem siap mengirim notifikasi WhatsApp tanpa limit!

---

## 🚀 Quick Start

### 1. Jalankan Backend
```bash
cd D:\Project\Matkul-Proyek\sita-bi
pnpm run dev:backend
```

### 2. Scan QR Code
- QR Code akan muncul di console saat pertama kali
- Atau akses: `GET http://localhost:3000/api/whatsapp/qr`
- Scan dengan WhatsApp Business Anda

### 3. Test Kirim Pesan
```bash
cd apps/api
npx ts-node -r tsconfig-paths/register src/contohAja.ts
```

---

## 📚 API Endpoints

### Base URL: `http://localhost:3000/api/whatsapp`

### 1. **Get Status**
```http
GET /api/whatsapp/status
Headers: x-user-id: 1
```

Response:
```json
{
  "success": true,
  "data": {
    "isReady": true,
    "hasQR": false,
    "qrCode": null
  }
}
```

### 2. **Get QR Code**
```http
GET /api/whatsapp/qr
Headers: x-user-id: 1
```

Response (jika belum scan):
```json
{
  "success": true,
  "message": "QR code available",
  "data": {
    "qrCode": "2@xxxxx...",
    "hasQR": true
  }
}
```

### 3. **Send Message**
```http
POST /api/whatsapp/send
Headers: 
  x-user-id: 1
  Content-Type: application/json

Body:
{
  "to": "082284184525",
  "message": "Hello from SITA-BI!"
}
```

Response:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### 4. **Send Message with Media**
```http
POST /api/whatsapp/send-media
Headers: 
  x-user-id: 1
  Content-Type: application/json

Body:
{
  "to": "082284184525",
  "message": "Lihat dokumen ini",
  "mediaPath": "/path/to/file.pdf",
  "caption": "Dokumen Tugas Akhir"
}
```

### 5. **Broadcast Message**
```http
POST /api/whatsapp/broadcast
Headers: 
  x-user-id: 1
  Content-Type: application/json

Body:
{
  "recipients": ["082284184525", "081234567890"],
  "message": "Pengumuman: Sidang akan dimulai besok!"
}
```

### 6. **Check Number Registration**
```http
POST /api/whatsapp/check
Headers: 
  x-user-id: 1
  Content-Type: application/json

Body:
{
  "phone": "082284184525"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "phone": "082284184525",
    "isRegistered": true
  }
}
```

### 7. **Logout**
```http
POST /api/whatsapp/logout
Headers: x-user-id: 1
```

---

## 🔔 Notification Types

WhatsApp service mendukung berbagai tipe notifikasi:

### 1. Bimbingan Created
```typescript
await whatsappService.sendNotification('BIMBINGAN_CREATED', {
  dosenPhone: '082284184525',
  tanggal: '20 Januari 2025',
  mahasiswaNama: 'John Doe',
  catatan: 'Pembahasan BAB 1',
});
```

### 2. Bimbingan Approved
```typescript
await whatsappService.sendNotification('BIMBINGAN_APPROVED', {
  mahasiswaPhone: '082284184525',
  tanggal: '20 Januari 2025',
  feedback: 'Sudah bagus, lanjutkan!',
});
```

### 3. Sidang Scheduled
```typescript
await whatsappService.sendNotification('SIDANG_SCHEDULED', {
  mahasiswaPhone: '082284184525',
  tanggal: '25 Januari 2025',
  waktu: '09:00 WIB',
  ruangan: 'Lab Komputer 1',
});
```

### 4. Tugas Akhir Approved
```typescript
await whatsappService.sendNotification('TUGAS_AKHIR_APPROVED', {
  mahasiswaPhone: '082284184525',
  judul: 'Sistem Informasi Akademik',
  pembimbing: 'Dr. John Doe',
});
```

### 5. Pengumuman Baru
```typescript
await whatsappService.sendNotification('PENGUMUMAN_NEW', {
  recipientPhone: '082284184525',
  judul: 'Pengumuman Penting',
  isi: 'Jadwal sidang telah dirilis',
  author: 'Admin SITA-BI',
});
```

---

## 💡 Usage Examples

### Example 1: Kirim Notifikasi dari Service
```typescript
// di bimbingan.service.ts
import { whatsappService } from './whatsapp.service';

async createBimbingan(data: any) {
  // ... create bimbingan logic
  
  // Kirim notifikasi WhatsApp ke dosen
  if (data.dosenPhone) {
    await whatsappService.sendNotification('BIMBINGAN_CREATED', {
      dosenPhone: data.dosenPhone,
      tanggal: data.tanggal,
      mahasiswaNama: data.mahasiswaNama,
      catatan: data.catatan,
    }).catch(err => {
      console.error('Failed to send WhatsApp notification:', err);
      // Don't block the main process if notification fails
    });
  }
  
  return bimbingan;
}
```

### Example 2: Kirim Pesan Custom
```typescript
import { whatsappService } from './whatsapp.service';

// Kirim pesan custom
await whatsappService.sendMessage(
  '082284184525',
  '🎓 *Reminder*\n\nJangan lupa hadir sidang besok jam 09:00!'
);
```

### Example 3: Broadcast ke Semua Mahasiswa
```typescript
// Get all mahasiswa phone numbers
const mahasiswaList = await prisma.mahasiswa.findMany({
  include: { user: true }
});

const phoneNumbers = mahasiswaList
  .map(m => m.nomor_hp)
  .filter(phone => phone !== null);

// Broadcast
await whatsappService.broadcastMessage(
  phoneNumbers,
  '📢 *Pengumuman*\n\nJadwal sidang semester ini telah dirilis!'
);
```

---

## 🔧 Configuration

### Environment Variables (optional)
```env
# .env
WHATSAPP_AUTO_INIT=true
WHATSAPP_NOTIFICATIONS_ENABLED=true
```

### Session Storage
Session WhatsApp disimpan di:
```
D:/Project/Matkul-Proyek/sita-bi/.wwebjs_auth/
```

⚠️ **Jangan delete folder ini!** Jika dihapus, Anda harus scan QR code lagi.

---

## 📱 Format Nomor Telepon

WhatsApp service otomatis menangani berbagai format nomor:

| Input | Output WhatsApp ID |
|-------|-------------------|
| `082284184525` | `628228418452@c.us` |
| `+6282284184525` | `628228418452@c.us` |
| `6282284184525` | `628228418452@c.us` |
| `0822-8418-4525` | `628228418452@c.us` |

Semua format akan dikonversi ke format Indonesia yang benar.

---

## 🎯 Testing Script

### Run Test Script
```bash
cd apps/api
npx ts-node -r tsconfig-paths/register src/contohAja.ts
```

Test script akan:
1. ✅ Initialize WhatsApp
2. ✅ Kirim pesan teks ke 082284184525
3. ✅ Cek status registrasi nomor
4. ✅ Kirim notifikasi bimbingan (simulasi)
5. ✅ Kirim notifikasi sidang (simulasi)

---

## 🔒 Security Notes

### ⚠️ Important!
- WhatsApp Web.js **TIDAK** menggunakan API resmi WhatsApp Business
- Ini menggunakan protokol WhatsApp Web (browser automation)
- **Risk**: Akun bisa dibanned jika mengirim spam/terlalu banyak pesan
- **Recommendation**: 
  - Jangan kirim lebih dari 50 pesan/jam
  - Tambahkan delay 2-3 detik antar pesan
  - Gunakan untuk notifikasi penting saja

### Best Practices:
1. ✅ Gunakan WhatsApp Business (lebih aman)
2. ✅ Batasi broadcast (max 50 recipients)
3. ✅ Tambahkan error handling
4. ✅ Log semua aktivitas
5. ✅ Backup session regularly

---

## 📊 Monitoring

### Check Status via Health Endpoint
```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2025-01-17T06:46:00.000Z",
  "whatsapp": {
    "isReady": true,
    "hasQR": false
  }
}
```

### View Logs
Semua aktivitas WhatsApp akan ter-log di console:
- 📱 QR Code generation
- ✅ Authentication success
- 📨 Message sent
- ❌ Errors

---

## 🛠️ Troubleshooting

### Problem: QR Code tidak muncul
**Solution**: Restart backend, tunggu 10-15 detik

### Problem: "WhatsApp client is not ready"
**Solution**: Pastikan sudah scan QR code dan status `isReady: true`

### Problem: Pesan tidak terkirim
**Solution**: 
1. Cek nomor tujuan terdaftar di WhatsApp
2. Cek format nomor (harus 628xxx)
3. Pastikan koneksi internet stabil

### Problem: Session hilang setelah restart
**Solution**: Jangan delete folder `.wwebjs_auth/`

### Problem: "Authentication failed"
**Solution**: 
1. Delete folder `.wwebjs_auth/`
2. Restart backend
3. Scan QR code lagi

---

## 📞 Integration with Existing Services

### Add to Bimbingan Service
```typescript
// apps/api/src/services/bimbingan.service.ts
import { whatsappService } from './whatsapp.service';

async createBimbingan(data) {
  const bimbingan = await this.prisma.bimbinganTA.create({ data });
  
  // Send WhatsApp notification
  try {
    await whatsappService.sendNotification('BIMBINGAN_CREATED', {
      dosenPhone: data.dosenPhone,
      mahasiswaPhone: data.mahasiswaPhone,
      tanggal: data.tanggal,
      mahasiswaNama: data.mahasiswaNama,
      catatan: data.catatan,
    });
  } catch (error) {
    console.error('Failed to send WhatsApp:', error);
    // Continue even if notification fails
  }
  
  return bimbingan;
}
```

### Add to Pengumuman Service
```typescript
// apps/api/src/services/pengumuman.service.ts
async createPengumuman(data) {
  const pengumuman = await this.prisma.pengumuman.create({ data });
  
  // Get all mahasiswa
  const mahasiswaList = await this.prisma.mahasiswa.findMany({
    select: { nomor_hp: true }
  });
  
  const phones = mahasiswaList
    .map(m => m.nomor_hp)
    .filter(p => p !== null);
  
  // Broadcast
  await whatsappService.broadcastMessage(
    phones,
    `📢 *${data.judul}*\n\n${data.isi}`
  );
  
  return pengumuman;
}
```

---

## ✨ Features

- ✅ **No Limit**: Tidak ada batasan dari API (gunakan bijak!)
- ✅ **Free**: Tidak ada biaya subscription
- ✅ **Rich Message**: Support formatting (bold, italic, emoji)
- ✅ **Media Support**: Kirim gambar, dokumen, video
- ✅ **Broadcast**: Kirim ke banyak nomor sekaligus
- ✅ **Auto Format**: Format nomor otomatis
- ✅ **Session Persistent**: Tetap login setelah restart
- ✅ **Error Handling**: Robust error handling
- ✅ **Type Safe**: Full TypeScript support

---

## 📝 Next Steps

1. ✅ Test kirim pesan dengan script `contohAja.ts`
2. ✅ Integrate ke service yang membutuhkan notifikasi
3. ✅ Setup notification triggers
4. ✅ Add phone number field ke database (jika belum ada)
5. ✅ Monitor logs untuk debugging

---

## 🎉 Success!

WhatsApp integration telah siap digunakan! Sistem SITA-BI sekarang bisa mengirim notifikasi WhatsApp tanpa batasan.

**Happy Coding! 🚀**

---

**Created by**: SITA-BI Team 7  
**Date**: 2025  
**Version**: 1.0.0
