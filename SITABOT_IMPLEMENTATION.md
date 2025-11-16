# SitaBot AI Chatbot Implementation

## Overview
SitaBot AI telah berhasil diimplementasikan pada halaman landing page SITA-BI. Button "Learn More" telah diganti dengan button "SitaBot" yang membuka popup chatbot dengan integrasi Gemini AI.

## File yang Dibuat

### 1. Frontend Components

#### `/apps/web/app/components/SitaBot/ChatbotModal.tsx`
- Component modal chatbot dengan animasi intro premium
- Menggunakan streaming response dari Gemini API
- Fitur:
  - Intro animation dengan efek sparkles dan glow
  - Real-time streaming response
  - Markdown support untuk response formatting
  - Stop generation button
  - Suggested prompts untuk quick start
  - Responsive design

#### `/apps/web/app/components/SitaBot/use-chat-logic.ts`
- Custom hook untuk mengelola chat logic
- Menggunakan Server-Sent Events (SSE) untuk streaming
- Integrasi dengan backend Gemini API endpoint
- Error handling dan abort control

#### `/apps/web/app/components/SitaBot/SitaBotButton.tsx`
- Button component untuk membuka chatbot modal
- Client component wrapper untuk server component HeroSection

### 2. Modified Files

#### `/apps/web/app/components/landing-page/HeroSection.tsx`
- Import SitaBotButton component
- Replace "Learn More" button dengan SitaBotButton

## Backend Integration

### API Endpoint
Backend sudah memiliki Gemini API setup di:
- **Public Endpoint**: `/api/gemini/chat/stream/public`
- **Type**: Server-Sent Events (SSE) streaming
- **Port**: 3002
- **Proxy**: Next.js rewrites to `http://localhost:3002/api/*`

### Backend Files (Already Exists)
- `/apps/api/src/api/gemini.router.ts` - API routes untuk Gemini
- `/apps/api/src/services/gemini.service.ts` - Service layer untuk Gemini AI
- Registered di `/apps/api/src/app.ts` pada route `/api/gemini`

## Dependencies Installed
```json
{
  "react-markdown": "^10.1.0",
  "remark-gfm": "^4.0.1",
  "@next/bundle-analyzer": "latest",
  "lucide-react": "^0.544.0" (already exists)
}
```

## Features

### 1. Premium Intro Animation
- Animated sparkles dan glow effects
- Smooth transition dari intro ke chat interface
- Durasi 2.5 detik

### 2. Chat Interface
- Real-time streaming responses
- Markdown formatting support (bold, italic, lists, code blocks)
- Message bubbles dengan avatar
- Auto-scroll ke message terbaru
- Loading indicator dengan animated dots

### 3. User Experience
- Suggested prompts untuk quick start:
  - "Bagaimana cara mengajukan topik?"
  - "Panduan bimbingan tugas akhir"
  - "Jadwal sidang proposal"
  - "Tips memilih topik penelitian"
- Stop generation button saat AI sedang generate
- Input validation
- Error handling
- Responsive design

### 4. Design System
- Menggunakan SITA-BI color scheme (red-900, red-700)
- Consistent dengan landing page design
- Professional gradient backgrounds
- Shadow dan blur effects

## How to Use

### 1. Start Backend
```bash
cd apps/api
pnpm dev
# Backend will run on http://localhost:3002
```

### 2. Start Frontend
```bash
cd apps/web
pnpm dev
# Frontend will run on http://localhost:3001
```

### 3. Open Browser
Navigate to `http://localhost:3001/` dan klik button "SitaBot" di hero section.

## Technical Details

### Streaming Implementation
- Menggunakan ReadableStream API
- Server-Sent Events (SSE) format
- Event types: `connected`, `chunk`, `done`, `error`
- Abort controller untuk stop generation

### State Management
- React hooks (useState, useRef, useEffect)
- Custom hook `useChatLogic` untuk reusability
- Message history management

### Styling
- Tailwind CSS dengan custom animations
- CSS-in-JS untuk keyframe animations
- Gradient backgrounds dan effects

## API Configuration

### Next.js Proxy
```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:3002/api/:path*',
    },
  ];
}
```

### API Call
```typescript
fetch('/api/gemini/chat/stream/public', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: input }),
});
```

## Testing Checklist

- [x] Button "SitaBot" muncul di hero section
- [x] Klik button membuka modal chatbot
- [x] Intro animation berjalan dengan baik
- [x] Transition ke chat interface smooth
- [x] Input field dapat menerima text
- [x] Send button mengirim message
- [x] Streaming response bekerja
- [x] Markdown formatting bekerja
- [x] Stop button dapat menghentikan generation
- [x] Close button menutup modal
- [x] Suggested prompts dapat diklik
- [x] Responsive di berbagai ukuran layar

## Future Enhancements
- [ ] Chat history persistence (localStorage)
- [ ] Authentication untuk personalized responses
- [ ] File upload support
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Context-aware responses tentang SITA-BI
- [ ] Integration dengan database untuk FAQ

## Notes
- Chatbot menggunakan public endpoint (tidak memerlukan authentication)
- Backend Gemini service sudah include rate limiting dan API key rotation
- Chatbot dapat menjawab pertanyaan umum dan topik tentang tugas akhir
