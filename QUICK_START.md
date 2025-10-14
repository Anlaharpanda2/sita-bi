# 🚀 Quick Start - SITA-BI

## Development (Dengan Auto-Start Redis)

### ✨ Single Command - Start Semua!

```bash
pnpm dev
```

Ini akan otomatis menjalankan:
- ✅ **Redis Server** (port 6379)
- ✅ **Backend API** (port 3000)  
- ✅ **Frontend Web** (port 3001)

Output akan terlihat seperti:
```
[redis] * Ready to accept connections on port 6379
[turbo] web:dev: ▲ Next.js 15.1.6
[turbo] api:dev: Server listening on port 3000
```

---

## Commands Available

### Development

```bash
# Start semua dengan Redis
pnpm dev

# Start tanpa Redis (jika Redis sudah running)
pnpm dev:no-redis

# Start hanya backend dengan Redis
pnpm dev:backend:redis

# Start hanya backend (tanpa Redis)
pnpm dev:backend

# Start hanya frontend
pnpm dev:frontend

# Start Redis saja
pnpm redis
```

### Production

```bash
# Build semua
pnpm build

# Start production (dengan Redis)
pnpm start

# Start production backend saja
pnpm start:backend
```

### Testing & Quality

```bash
# Check backend (lint + format + build + test)
pnpm check:backend

# Check frontend (lint + format + build)
pnpm check:frontend

# Run all tests
pnpm test

# Lint all packages
pnpm lint

# Format all files
pnpm format
```

---

## Deployment

### Simple Deployment (1 Command!)

```bash
# 1. Build
pnpm build

# 2. Start (Redis + Backend otomatis jalan!)
pnpm start
```

### Manual Deployment

Jika ingin kontrol lebih:

```bash
# Terminal 1: Redis
pnpm redis

# Terminal 2: Backend
pnpm start:backend

# Terminal 3: Frontend (jika production build)
cd apps/web && pnpm start
```

---

## Troubleshooting

### Redis Sudah Running?

Jika Redis sudah jalan di background:
```bash
# Gunakan dev tanpa auto-start Redis
pnpm dev:no-redis
```

### Port Conflict?

Jika port 6379 sudah dipakai:
```bash
# Edit REDIS_URL di .env
REDIS_URL=redis://localhost:6380

# Start Redis di port lain
redis-server --port 6380
```

### Check Redis Status

```bash
# Test koneksi
redis-cli ping
# Output: PONG

# Check cache
redis-cli keys "sita:*"
```

---

## Environment Setup

### First Time Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Setup database
cd packages/db
pnpm prisma migrate dev

# 3. Seed database (optional)
pnpm prisma db seed

# 4. Start development
cd ../..
pnpm dev
```

### Environment Variables

Buat file `.env` di `apps/api`:

```env
# Database
DATABASE_URL="file:../../../packages/db/prisma/dev.db"

# Redis
REDIS_URL=redis://localhost:6379

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# App
APP_NAME="sita-bi"
PORT=3000
FRONTEND_URL=http://localhost:3001
NODE_ENV=development

# Upload
UPLOADS_DIR=uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=jpeg,jpg,png,gif,pdf,doc,docx
```

---

## Tech Stack

- **Frontend**: Next.js 15 + React + TailwindCSS
- **Backend**: Express.js + TypeScript
- **Database**: SQLite + Prisma ORM
- **Cache**: Redis (TTL selamanya + auto-sync)
- **Monorepo**: Turborepo + pnpm workspaces

---

## Features

✅ **Auto-sync Cache**: Redis otomatis sinkron dengan database  
✅ **Persistent Sessions**: User tetap login setelah restart  
✅ **Hot Reload**: Frontend & backend auto-reload saat dev  
✅ **Type Safety**: Full TypeScript di semua packages  
✅ **Shared Types**: Types di-share antar frontend-backend  

---

## Project Structure

```
sita-bi/
├── apps/
│   ├── api/          # Backend Express.js
│   └── web/          # Frontend Next.js
├── packages/
│   ├── db/           # Prisma + SQLite
│   ├── types/        # Shared TypeScript types
│   ├── ui/           # Shared UI components
│   └── config/       # Shared configs
├── package.json      # Root commands
└── turbo.json        # Turborepo config
```

---

## Need Help?

- 📖 **Redis Setup**: Lihat `REDIS_SETUP.md`
- 🔐 **Auth Implementation**: Lihat `AUTH_REDIS_IMPLEMENTATION.md`
- 🐛 **Issues**: Check logs di console

---

Happy Coding! 🎉
