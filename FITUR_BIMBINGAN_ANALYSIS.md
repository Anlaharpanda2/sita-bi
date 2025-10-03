# 📚 Analisis Fitur Bimbingan SITA-BI

## 🎯 **Overview Sistem Bimbingan**

Sistem bimbingan memfasilitasi hubungan pembimbingan antara dosen dan mahasiswa untuk tugas akhir, mulai dari pengajuan pembimbing hingga proses bimbingan aktif.

## 📊 **Database Schema**

### **1. Model Utama**

#### **PengajuanBimbingan**
```sql
- id: Int (Primary Key)
- mahasiswa_id: Int (Foreign Key)
- dosen_id: Int (Foreign Key) 
- diinisiasi_oleh: String ('mahasiswa' | 'dosen')
- status: PengajuanStatus (MENUNGGU_PERSETUJUAN_DOSEN, MENUNGGU_PERSETUJUAN_MAHASISWA, DISETUJUI, DITOLAK, DIBATALKAN)
- created_at, updated_at: DateTime
```

#### **TugasAkhir**
```sql
- id: Int (Primary Key)
- mahasiswa_id: Int (Foreign Key, Unique)
- judul: String
- status: StatusTugasAkhir
- peranDosenTa: PeranDosenTa[] (Relasi pembimbing)
```

#### **PeranDosenTa**
```sql
- id: Int (Primary Key)
- tugas_akhir_id: Int (Foreign Key)
- dosen_id: Int (Foreign Key)
- peran: PeranDosen ('pembimbing1' | 'pembimbing2' | 'penguji1' | 'penguji2')
```

#### **BimbinganTA**
```sql
- id: Int (Primary Key)
- tugas_akhir_id: Int (Foreign Key)
- dosen_id: Int (Foreign Key)
- sesi_ke: Int?
- tanggal_bimbingan: DateTime?
- jam_bimbingan: String?
- status_bimbingan: StatusBimbingan (DIJADWALKAN, SELESAI, DIBATALKAN)
```

#### **CatatanBimbingan**
```sql
- id: Int (Primary Key)
- bimbingan_ta_id: Int (Foreign Key)
- author_id: Int (Foreign Key)
- catatan: String
- author_type: String ('Mahasiswa' | 'Dosen')
```

## 🔄 **Alur Pengajuan Pembimbing**

### **Fase 1: Pencarian Pembimbing**

#### **Skenario A: Mahasiswa Mengajukan ke Dosen**
1. **Mahasiswa** melihat daftar dosen tersedia
2. **Mahasiswa** mengirim pengajuan (maksimal 3 pengajuan aktif)
3. **Status**: `MENUNGGU_PERSETUJUAN_DOSEN`
4. **Dosen** menerima notifikasi pengajuan
5. **Dosen** dapat `Terima` atau `Tolak`

#### **Skenario B: Dosen Menawarkan ke Mahasiswa**
1. **Dosen** melihat mahasiswa yang belum punya pembimbing
2. **Dosen** mengirim tawaran pembimbingan
3. **Status**: `MENUNGGU_PERSETUJUAN_MAHASISWA`
4. **Mahasiswa** dapat `Terima` atau `Tolak`

### **Fase 2: Persetujuan**
- Jika **DISETUJUI**: Membuat `PeranDosenTa` dengan role `pembimbing1`
- Membuat `TugasAkhir` dengan status `DISETUJUI`
- Status pengajuan lain menjadi `DIBATALKAN`

## 🎛️ **API Endpoints**

### **Pengajuan Routes** (`/api/pengajuan`)

#### **Mahasiswa**
```http
POST /api/pengajuan/mahasiswa
Body: { dosenId: number }
Description: Mahasiswa mengajukan ke dosen

GET /api/pengajuan/mahasiswa  
Description: Lihat pengajuan mahasiswa (masuk & keluar)

POST /api/pengajuan/{id}/terima
Description: Mahasiswa terima tawaran dosen

POST /api/pengajuan/{id}/tolak
Description: Mahasiswa tolak tawaran dosen

POST /api/pengajuan/{id}/batalkan
Description: Mahasiswa batalkan pengajuan sendiri
```

#### **Dosen**
```http
POST /api/pengajuan/dosen
Body: { mahasiswaId: number }
Description: Dosen tawarkan pembimbingan

GET /api/pengajuan/dosen
Description: Lihat pengajuan untuk dosen (masuk & keluar)

POST /api/pengajuan/{id}/terima  
Description: Dosen terima pengajuan mahasiswa

POST /api/pengajuan/{id}/tolak
Description: Dosen tolak pengajuan mahasiswa
```

### **Bimbingan Routes** (`/api/bimbingan`)

#### **Data Bimbingan**
```http
GET /api/bimbingan/sebagai-mahasiswa
Description: Data tugas akhir & bimbingan mahasiswa

GET /api/bimbingan/sebagai-dosen?page=1&limit=50
Description: Data mahasiswa bimbingan dosen
```

#### **Manajemen Sesi**
```http
POST /api/bimbingan/{tugasAkhirId}/jadwal
Body: { tanggal_bimbingan: string, jam_bimbingan: string }
Description: Dosen jadwalkan sesi bimbingan

POST /api/bimbingan/sesi/{id}/selesaikan
Description: Dosen selesaikan sesi

POST /api/bimbingan/sesi/{id}/cancel
Description: Dosen batalkan sesi
```

#### **Catatan Bimbingan**
```http
POST /api/bimbingan/catatan
Body: { bimbingan_ta_id: number, catatan: string }
Description: Tambah catatan (mahasiswa/dosen)
```

## 💻 **Frontend Pages**

### **Mahasiswa** (`/dashboard/mahasiswa/bimbingan`)

#### **Belum Punya Pembimbing**
- **Grid Layout**: Dosen tersedia (kiri) | Status pengajuan (kanan)
- **Dosen Tersedia**: List dosen dengan tombol "Kirim Pengajuan"
- **Limit**: Maksimal 3 pengajuan aktif
- **Tawaran Masuk**: Notifikasi tawaran dari dosen
- **Pengajuan Terkirim**: Status pengajuan yang dikirim

#### **Sudah Punya Pembimbing**
- **Info Pembimbing**: Nama dosen pembimbing 1 & 2
- **Timeline Bimbingan**: Riwayat sesi bimbingan
- **Status TA**: Status tugas akhir saat ini

### **Dosen** (`/dashboard/dosen/pengajuan-bimbingan`)

#### **Manajemen Pengajuan**
- **Incoming Requests**: Pengajuan dari mahasiswa
- **Sent Offers**: Tawaran yang dikirim ke mahasiswa  
- **Actions**: Accept, Reject, Cancel

### **Dosen** (`/dashboard/dosen/bimbingan`)

#### **Mahasiswa Bimbingan**
- **List Mahasiswa**: Yang sedang dibimbing
- **Schedule Form**: Jadwalkan sesi baru
- **Session Management**: 
  - View jadwal & status sesi
  - Selesaikan atau batalkan sesi
  - Tambah catatan bimbingan
- **Timeline**: Riwayat bimbingan per mahasiswa

## 🎨 **UI Components & Features**

### **Status Indicators**
```typescript
// Pengajuan Status
- MENUNGGU_PERSETUJUAN_DOSEN: Yellow/Orange
- MENUNGGU_PERSETUJUAN_MAHASISWA: Blue  
- DISETUJUI: Green
- DITOLAK: Red
- DIBATALKAN: Gray

// Bimbingan Status  
- DIJADWALKAN: Blue
- SELESAI: Green
- DIBATALKAN: Red
```

### **Interactive Elements**
- **Confirmation Dialogs**: Sebelum accept/reject/cancel
- **Real-time Updates**: Refresh data setelah action
- **Form Validation**: Date/time picker untuk jadwal
- **Responsive Design**: Grid layout adaptif

## 🔐 **Security & Authorization**

### **Middleware Stack**
1. **JWT Authentication**: Semua routes protected
2. **Role Authorization**: Mahasiswa vs Dosen access
3. **Ownership Validation**: Cek kepemilikan data

### **Business Rules**
- **Mahasiswa**: Maksimal 3 pengajuan aktif
- **Pembimbing**: Maksimal 2 per tugas akhir (pembimbing1 & pembimbing2)
- **Unique Constraint**: 1 pengajuan per pasangan mahasiswa-dosen
- **Session Access**: Hanya pembimbing yang terlibat bisa akses sesi

## 🚧 **Status Implementasi**

### **✅ Sudah Implemented**
- Database schema lengkap
- API routes dasar
- Frontend UI untuk mahasiswa & dosen
- Authentication & authorization
- Basic CRUD operations

### **🚧 Perlu Implementasi Lengkap**
- **Service Layer**: `PengajuanService` masih placeholder
- **Notification System**: Real-time notifications
- **File Upload**: Dokumen pendukung
- **Advanced Features**:
  - Reschedule bimbingan
  - Bulk operations
  - Reporting & analytics
  - Email notifications

## 🎯 **Rekomendasi Pengembangan**

### **Priority 1: Core Functionality**
1. **Implement PengajuanService** methods
2. **Test API endpoints** end-to-end
3. **Fix frontend API calls** yang error

### **Priority 2: User Experience**
1. **Real-time notifications** 
2. **Better form validation**
3. **Loading states & error handling**

### **Priority 3: Advanced Features**
1. **Calendar integration**
2. **Document management**
3. **Reporting dashboard**

Sistem bimbingan SITA-BI memiliki fondasi yang solid dengan UI yang user-friendly. Yang paling krusial adalah menyelesaikan implementasi service layer untuk fungsionalitas pengajuan pembimbing.