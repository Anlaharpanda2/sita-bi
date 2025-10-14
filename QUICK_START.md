# 🚀 Quick Start - SITA-BI

## Development

### ✨ Single Command - Start Everything!

```bash
pnpm dev
```

This will automatically run:
- ✅ **Backend API** (port 3000)  
- ✅ **Frontend Web** (port 3001)

Output will look like:
```
[turbo] web:dev: ▲ Next.js 15.1.6
[turbo] api:dev: Server listening on port 3000
```

---

## Commands Available

### Development

```bash
# Start all services
pnpm dev

# Start backend only
pnpm dev:backend

# Start frontend only
pnpm dev:frontend
```

### Production

```bash
# Build all
pnpm build

# Start production backend
pnpm start:backend

# Or use the start alias
pnpm start
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

# 2. Start
pnpm start
```

### Manual Deployment

If you want more control:

```bash
# Terminal 1: Backend
pnpm start:backend

# Terminal 2: Frontend (if production build)
cd apps/web && pnpm start
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

Create `.env` file in `apps/api`:

```env
# Database
DATABASE_URL="file:../../../packages/db/prisma/dev.db"

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
- **Monorepo**: Turborepo + pnpm workspaces

---

## Features

✅ **Fast Performance**: SQLite optimized for speed (28ms avg query)  
✅ **Persistent Sessions**: User stays logged in after restart  
✅ **Hot Reload**: Frontend & backend auto-reload during dev  
✅ **Type Safety**: Full TypeScript across all packages  
✅ **Shared Types**: Types shared between frontend-backend  

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

## Performance

With SQLite optimization:
- **Average query time**: 28ms for 50 records
- **No network latency**: Database is local
- **Simple architecture**: Less complexity, fewer bugs

---

## Troubleshooting

### Port Already in Use?

If port 3000 or 3001 is already in use:
```bash
# Change port in .env (backend)
PORT=3002

# Or kill the process
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:3000 | xargs kill -9
```

---

## Need Help?

- 🐛 **Issues**: Check logs in console
- 📖 **Documentation**: See README.md

---

Happy Coding! 🎉
