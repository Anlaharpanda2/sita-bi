# 🚀 Cara Menjalankan Production Mode

## ❌ Masalah dengan PM2

PM2 membutuhkan build backend yang sempurna dengan semua dependencies ter-bundle. Saat ini ada issue dengan module resolution untuk `@repo/types`.

**Solusi Sementara: Gunakan manual start (recommended!)**

---

## ✅ CARA YANG BENAR (Manual Start)

### **Terminal 1 - Backend Development:**
```bash
cd D:\Project\Matkul-Proyek\sita-bi
pnpm run dev:backend
```

**Output yang benar:**
```
✅ Prisma client initialized
✅ WhatsApp service initialized
🔐 WhatsApp authenticated successfully!
✅ WhatsApp Client is ready!
🚀 Server running on http://localhost:3002
```

### **Terminal 2 - Frontend Production:**
```bash
cd D:\Project\Matkul-Proyek\sita-bi\apps\web
pnpm start -p 3001
```

**Output yang benar:**
```
▲ Next.js 15.x.x
- Local:        http://localhost:3001
- Network:      http://192.168.x.x:3001

✓ Ready in 432ms
```

---

## 🌐 Akses Aplikasi

### **Lokal:**
```
http://localhost:3001
```

### **Network (Device lain di jaringan yang sama):**
```
http://[YOUR-IP]:3001
```

**Cari IP Anda:**
```bash
# Windows
ipconfig
# Cari "IPv4 Address"

# Linux/Mac
ifconfig
# atau
ip addr show
```

---

## 🌍 Expose ke Internet (Demo/Testing)

### **Cloudflare Tunnel (Gratis, Unlimited):**

**Install:**
```bash
pnpm add -g cloudflared
```

**Terminal 3 - Backend Tunnel:**
```bash
cloudflared tunnel --url http://localhost:3002
```
Output:
```
Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):
https://abc-def-ghi.trycloudflare.com
```
**Copy URL ini untuk backend!**

**Terminal 4 - Frontend Tunnel:**
```bash
cloudflared tunnel --url http://localhost:3001
```
Output:
```
Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):
https://xyz-uvw-rst.trycloudflare.com
```
**Copy URL ini dan SHARE ke siapa saja!** 🎉

**Update Environment Variables:**
```bash
# Backend .env
FRONTEND_URL=https://xyz-uvw-rst.trycloudflare.com

# Frontend .env.local (buat file baru)
NEXT_PUBLIC_API_URL=https://abc-def-ghi.trycloudflare.com
```

**Restart kedua service (Ctrl+C, lalu run ulang).**

---

## 📊 Performance Check

### **Lighthouse Test:**
1. Buka Chrome DevTools (F12)
2. Tab "Lighthouse"
3. Categories: Performance, Accessibility, Best Practices, SEO
4. Analyze page load

**Target:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 90+

**Your Current Score: 94** ✅

---

## 🎓 Deploy ke Server Kampus

### **Step 1: Preparation**
```bash
# 1. Build project
pnpm run build

# 2. Copy files ke server
# - Seluruh folder project
# - File .env (dengan credentials production)
```

### **Step 2: Server Setup**
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2
npm install -g pm2
```

### **Step 3: Install Dependencies**
```bash
cd /path/to/sita-bi
pnpm install --production
```

### **Step 4: Database Setup**
```bash
cd packages/db
pnpm prisma generate
pnpm prisma migrate deploy
```

### **Step 5: Start Services**

**Backend:**
```bash
cd apps/api
NODE_ENV=production node dist/apps/api/src/server.js
# atau pakai PM2:
pm2 start dist/apps/api/src/server.js --name sita-bi-backend
```

**Frontend:**
```bash
cd apps/web
pnpm start -p 3001
# atau pakai PM2:
pm2 start "pnpm start -p 3001" --name sita-bi-frontend
```

### **Step 6: Setup Nginx**

**Install:**
```bash
sudo apt install nginx
```

**Config:** `/etc/nginx/sites-available/sitabi`
```nginx
server {
    listen 80;
    server_name sitabi.pnp.ac.id;

    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

**Enable:**
```bash
sudo ln -s /etc/nginx/sites-available/sitabi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### **Step 7: SSL Certificate**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d sitabi.pnp.ac.id
```

### **Step 8: Auto-start dengan PM2**
```bash
pm2 startup
pm2 save
```

---

## 🔧 Troubleshooting

### **Backend tidak start:**
```bash
# Check logs
cd apps/api
cat logs/error.log

# Test manual
pnpm run dev:backend
```

### **Frontend tidak start:**
```bash
# Check jika port sudah digunakan
netstat -ano | findstr :3001

# Kill process
taskkill /PID <PID> /F

# Rebuild
cd apps/web
pnpm run build
pnpm start -p 3001
```

### **Database error:**
```bash
cd packages/db
pnpm prisma generate
pnpm prisma migrate dev
```

### **WhatsApp tidak connect:**
```bash
# Hapus session lama
rm -rf apps/api/.wwebjs_auth

# Restart backend
# Scan QR code lagi
```

---

## 📝 Checklist

### **Untuk Demo Sekarang:**
- [ ] Backend running: `pnpm run dev:backend`
- [ ] Frontend running: `pnpm start -p 3001`
- [ ] Test akses: http://localhost:3001
- [ ] (Optional) Cloudflare tunnel untuk demo online

### **Untuk Deploy ke Server:**
- [ ] Build berhasil: `pnpm run build`
- [ ] Database migrated
- [ ] Environment variables configured
- [ ] Nginx installed & configured
- [ ] SSL certificate installed
- [ ] Services running with PM2
- [ ] Firewall configured (port 80, 443)
- [ ] DNS pointing ke server IP

---

## 🎯 Quick Commands

```bash
# Development
pnpm run dev:backend   # Backend dev
pnpm run dev:frontend  # Frontend dev

# Production Local
pnpm run build         # Build semua
pnpm start -p 3001     # Frontend production (di folder apps/web)
pnpm run dev:backend   # Backend (sementara pakai dev)

# Monitoring
pm2 list              # List processes
pm2 logs              # View logs
pm2 monit             # Monitor realtime
```

---

**✅ Current Status:** Production frontend READY (Lighthouse 94)  
**✅ Backend:** Working (WhatsApp + Email integrated)  
**⚠️ PM2:** Skip dulu, pakai manual start  
**🎯 Next:** Demo dengan Cloudflare Tunnel atau Deploy ke server kampus

---

**Questions? Cek:**
- `PRODUCTION_READY.md` - Overview
- `DEPLOYMENT_GUIDE.md` - Complete guide
- `nginx.conf` - Sample config
