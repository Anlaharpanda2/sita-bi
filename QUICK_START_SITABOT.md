# 🤖 SitaBot Quick Start Guide

## Apa itu SitaBot?
SitaBot adalah AI chatbot assistant yang terintegrasi dengan Google Gemini AI, dirancang khusus untuk membantu mahasiswa dan dosen dalam sistem tugas akhir SITA-BI.

## 📍 Lokasi Button
Button SitaBot dapat ditemukan di:
- **Halaman:** Landing Page (http://localhost:3001/)
- **Posisi:** Hero Section, sebelah kanan button "Get Started"
- **Tampilan:** Button dengan icon MessageCircle dan text "SitaBot"

## 🚀 Quick Start (3 Steps)

### 1. Start Backend
```bash
cd apps/api
pnpm dev
```
Backend akan berjalan di http://localhost:3002

### 2. Start Frontend
```bash
cd apps/web
pnpm dev
```
Frontend akan berjalan di http://localhost:3001

### 3. Test Chatbot
1. Buka browser: http://localhost:3001/
2. Klik button **"SitaBot"** di hero section
3. Tunggu intro animation (2.5 detik)
4. Mulai chat dengan AI!

## 💬 Cara Menggunakan

### Method 1: Suggested Prompts
Klik salah satu dari 4 suggested prompts:
- 📚 "Bagaimana cara mengajukan topik?"
- 📝 "Panduan bimbingan tugas akhir"
- 📅 "Jadwal sidang proposal"
- 💡 "Tips memilih topik penelitian"

### Method 2: Type Your Question
1. Ketik pertanyaan di input field
2. Tekan **Enter** atau klik button **"Kirim"**
3. AI akan respond secara real-time (streaming)

### Stop Generation
Jika response terlalu panjang:
- Klik button **Stop** (icon kotak) saat AI sedang generate

### Close Chatbot
- Klik button **X** di header
- Atau klik area di luar modal

## 🎯 Contoh Pertanyaan

### Tentang Sistem
- "Apa itu SITA-BI?"
- "Bagaimana cara login?"
- "Fitur apa saja yang tersedia?"

### Tentang Tugas Akhir
- "Bagaimana cara mengajukan topik TA?"
- "Siapa yang bisa jadi pembimbing?"
- "Berapa lama proses bimbingan?"

### Tentang Sidang
- "Kapan jadwal sidang proposal?"
- "Apa syarat mengikuti sidang?"
- "Bagaimana format presentasi?"

### Tips Akademik
- "Tips memilih topik penelitian yang baik"
- "Cara membuat proposal yang efektif"
- "Strategi bimbingan yang efisien"

## ⚙️ Troubleshooting

### Button SitaBot tidak muncul
```bash
# Pastikan frontend sudah rebuild
cd apps/web
pnpm build
pnpm dev
```

### Chatbot tidak respond
1. **Cek Backend:** Pastikan backend running di port 3002
   ```bash
   curl http://localhost:3002/health
   ```

2. **Cek Console:** Buka browser DevTools → Console untuk error messages

3. **Cek API Key:** Pastikan Gemini API key sudah di-set di backend `.env`

### Streaming tidak bekerja
- Clear browser cache
- Reload halaman
- Pastikan browser support Server-Sent Events (SSE)

### Error "Failed to fetch"
- Pastikan backend running
- Cek Next.js proxy configuration di `next.config.js`
- Verifikasi port 3002 tidak digunakan aplikasi lain

## 🔧 Configuration

### Backend API Endpoint
```typescript
// Location: apps/web/app/components/SitaBot/use-chat-logic.ts
fetch('/api/gemini/chat/stream/public', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: input }),
});
```

### Next.js Proxy
```javascript
// Location: apps/web/next.config.js
async rewrites() {
  return [{
    source: '/api/:path*',
    destination: 'http://localhost:3002/api/:path*',
  }];
}
```

## 📊 Features Checklist

✅ Real-time streaming responses  
✅ Markdown formatting support  
✅ Premium intro animation  
✅ Suggested prompts  
✅ Stop generation  
✅ Auto-scroll  
✅ Error handling  
✅ Responsive design  
✅ Loading indicators  
✅ Close modal  

## 🎨 Customization

### Mengubah Suggested Prompts
Edit file: `apps/web/app/components/SitaBot/ChatbotModal.tsx`
```tsx
// Line ~249
const prompts = [
  { icon: '📚', text: 'Your custom prompt 1' },
  { icon: '📝', text: 'Your custom prompt 2' },
  // ... add more
];
```

### Mengubah Color Theme
Ganti class Tailwind:
- `red-900` → color pilihan Anda
- `red-700` → shade lebih terang
- `red-100` → shade untuk borders

### Mengubah Intro Duration
Edit file: `apps/web/app/components/SitaBot/ChatbotModal.tsx`
```tsx
// Line ~47
const timer = setTimeout(() => {
  setShowIntro(false);
}, 2500); // Change duration here (ms)
```

## 📚 Related Files

### Frontend
- `apps/web/app/components/SitaBot/ChatbotModal.tsx`
- `apps/web/app/components/SitaBot/SitaBotButton.tsx`
- `apps/web/app/components/SitaBot/use-chat-logic.ts`
- `apps/web/app/components/landing-page/HeroSection.tsx`

### Backend
- `apps/api/src/api/gemini.router.ts`
- `apps/api/src/services/gemini.service.ts`
- `apps/api/src/app.ts`

### Documentation
- `SITABOT_IMPLEMENTATION.md` - Full implementation details
- `SITABOT_CHANGES.md` - Summary of changes
- `QUICK_START_SITABOT.md` - This file

## 🆘 Need Help?

1. Check backend logs: `cd apps/api && pnpm dev`
2. Check frontend logs: `cd apps/web && pnpm dev`
3. Open browser DevTools → Console
4. Read error messages carefully
5. Check documentation files

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Button "SitaBot" appears in hero section
- ✅ Clicking button shows intro animation
- ✅ Chat interface appears after animation
- ✅ Typing message and clicking Send works
- ✅ AI responds with streaming text
- ✅ Messages display with proper formatting

---

**Happy Chatting with SitaBot! 🚀**
