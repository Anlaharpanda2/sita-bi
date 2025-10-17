# 🚀 Production Deployment Guide - SITA-BI

Panduan lengkap untuk deploy SITA-BI ke production server dengan best practices industri.

---

## 📋 Prerequisites

1. **Node.js v18+** sudah terinstall
2. **pnpm** package manager
3. **PM2** process manager
4. **Nginx** web server (optional tapi recommended)
5. **Database** PostgreSQL sudah running

---

## 🔧 Step 1: Install PM2 (Process Manager)

PM2 adalah industry-standard process manager untuk Node.js production.

```bash
# Install PM2 globally
pnpm add -g pm2

# Verifikasi instalasi
pm2 --version
```

**Keuntungan PM2:**
- ✅ Auto-restart jika crash
- ✅ Load balancing (multi-core)
- ✅ Monitoring & logging
- ✅ Zero-downtime reload
- ✅ Startup script (auto-start saat server restart)

---

## 🏗️ Step 2: Build Production

Build semua packages untuk production:

```bash
# Di root project
cd D:\Project\Matkul-Proyek\sita-bi

# Install dependencies
pnpm install

# Build semua packages
pnpm run build

# Verifikasi build berhasil
# - apps/api/dist/ harus ada
# - apps/web/.next/ harus ada
```

---

## 🚀 Step 3: Start dengan PM2

### **Opsi A: Start Semua Service (Recommended)**

```bash
# Start backend + frontend sekaligus
pm2 start ecosystem.config.cjs

# Output:
# ┌────┬────────────────────┬─────────┬─────────┬──────────┐
# │ id │ name               │ mode    │ status  │ cpu      │
# ├────┼────────────────────┼─────────┼─────────┼──────────┤
# │ 0  │ sita-bi-backend    │ fork    │ online  │ 0%       │
# │ 1  │ sita-bi-frontend   │ fork    │ online  │ 0%       │
# └────┴────────────────────┴─────────┴─────────┴──────────┘
```

### **Opsi B: Start Manual (Satu per Satu)**

```bash
# Backend saja
pm2 start apps/api/dist/server.js --name "sita-bi-backend"

# Frontend saja
pm2 start "pnpm --filter web start" --name "sita-bi-frontend"
```

---

## 📊 Step 4: Monitoring & Management

### **Basic Commands:**

```bash
# List semua process
pm2 list

# Monitor realtime (CPU, Memory, Logs)
pm2 monit

# Lihat logs
pm2 logs

# Logs specific app
pm2 logs sita-bi-backend
pm2 logs sita-bi-frontend

# Restart aplikasi
pm2 restart all
pm2 restart sita-bi-backend
pm2 restart sita-bi-frontend

# Stop aplikasi
pm2 stop all
pm2 stop sita-bi-backend

# Delete dari PM2
pm2 delete all
pm2 delete sita-bi-backend

# Flush logs
pm2 flush

# Dashboard web (optional)
pm2 plus
```

### **Advanced Monitoring:**

```bash
# Show detailed info
pm2 show sita-bi-backend

# CPU & Memory usage
pm2 monit

# Export monitoring data
pm2 dump
```

---

## 🔄 Step 5: Auto-Start on Server Reboot

Setup PM2 untuk auto-start saat server reboot:

```bash
# Generate startup script
pm2 startup

# Save current process list
pm2 save

# Test: restart komputer, PM2 akan auto-start
```

---

## 🌐 Step 6: Setup Nginx (Reverse Proxy)

### **Install Nginx di Windows:**

1. Download dari: http://nginx.org/en/download.html
2. Extract ke `C:\nginx`
3. Copy `nginx.conf` dari project ke `C:\nginx\conf\`

```bash
# Start Nginx
cd C:\nginx
nginx.exe

# Reload configuration
nginx.exe -s reload

# Stop Nginx
nginx.exe -s stop
```

### **Install Nginx di Linux (Server Kampus):**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# Copy configuration
sudo cp nginx.conf /etc/nginx/sites-available/sitabi
sudo ln -s /etc/nginx/sites-available/sitabi /etc/nginx/sites-enabled/

# Edit untuk set domain
sudo nano /etc/nginx/sites-available/sitabi
# Ganti: server_name sitabi.pnp.ac.id;

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable auto-start
sudo systemctl enable nginx
```

### **Keuntungan Nginx:**

- ✅ **Reverse Proxy**: Semua traffic lewat port 80/443
- ✅ **Load Balancing**: Distribute traffic ke multiple instances
- ✅ **SSL/HTTPS**: Secure connection
- ✅ **Static File Serving**: Faster untuk assets
- ✅ **Gzip Compression**: Smaller file size
- ✅ **Rate Limiting**: Prevent DDoS
- ✅ **Caching**: Faster response time

---

## 🔒 Step 7: Environment Variables (Production)

Create production `.env` files:

### **Backend `.env`:**

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/sitabi"

# JWT Secret (generate random 32 chars)
JWT_SECRET="CHANGE_THIS_TO_RANDOM_STRING_32_CHARS"

# Email
EMAIL_USER="sitabi.pnp@gmail.com"
EMAIL_PASS="your-app-password"

# App Config
NODE_ENV="production"
PORT=3002
FRONTEND_URL="http://sitabi.pnp.ac.id"  # Domain kampus

# Upload
UPLOADS_DIR="uploads"
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES="jpeg,jpg,png,gif,pdf,doc,docx"
```

### **Frontend `.env.local`:**

```bash
# API URL (pakai Nginx, bukan direct port)
NEXT_PUBLIC_API_URL="http://sitabi.pnp.ac.id/api"

# Environment
NODE_ENV="production"
```

---

## 📦 Step 8: Deploy Update (Zero-Downtime)

Saat ada update code:

```bash
# 1. Pull latest code
git pull origin main

# 2. Install dependencies (jika ada perubahan)
pnpm install

# 3. Build ulang
pnpm run build

# 4. Reload PM2 (zero-downtime)
pm2 reload all

# Atau reload satu per satu:
pm2 reload sita-bi-backend
pm2 reload sita-bi-frontend

# 5. Verifikasi
pm2 logs
```

---

## 🔍 Step 9: Health Check & Troubleshooting

### **Check Service Status:**

```bash
# PM2 status
pm2 status

# Nginx status (Linux)
sudo systemctl status nginx

# Check ports
netstat -ano | findstr :3001
netstat -ano | findstr :3002
netstat -ano | findstr :80

# Test API
curl http://localhost:3002/api/health
curl http://localhost/api/health  # Via Nginx
```

### **Common Issues:**

**1. Port sudah digunakan:**
```bash
# Kill process di port
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**2. PM2 tidak start:**
```bash
# Check logs
pm2 logs --lines 100

# Restart dengan error details
pm2 restart all --log-date-format 'YYYY-MM-DD HH:mm:ss Z'
```

**3. Nginx error:**
```bash
# Test config
nginx -t

# Check logs
tail -f /var/log/nginx/error.log
```

---

## 📊 Step 10: Performance Monitoring

### **PM2 Monitoring:**

```bash
# Realtime monitoring
pm2 monit

# CPU & Memory stats
pm2 describe sita-bi-backend

# Custom monitoring (PM2 Plus)
pm2 plus
# Register dan dapatkan monitoring dashboard
```

### **Server Monitoring:**

```bash
# Server resources (Windows)
Get-Process node | Select-Object CPU, Memory, ProcessName

# Server resources (Linux)
htop
# atau
top

# Disk usage
df -h

# Memory usage
free -h
```

---

## 🎯 Production Checklist

Sebelum go-live, pastikan:

- [ ] ✅ Environment variables sudah set dengan benar
- [ ] ✅ Database connection works
- [ ] ✅ PM2 services running (backend + frontend)
- [ ] ✅ Nginx configured dan running
- [ ] ✅ Auto-startup enabled (`pm2 startup` + `pm2 save`)
- [ ] ✅ Logs directory exists dan writable
- [ ] ✅ Upload directory exists dan writable
- [ ] ✅ Firewall rules configured (port 80, 443)
- [ ] ✅ SSL certificate installed (untuk HTTPS)
- [ ] ✅ Domain DNS pointing ke server
- [ ] ✅ Health check endpoint works
- [ ] ✅ WhatsApp service authenticated
- [ ] ✅ Email service configured
- [ ] ✅ Backup strategy in place

---

## 🚨 Security Best Practices

### **1. Firewall:**
```bash
# Linux - Allow only necessary ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH
sudo ufw enable

# Block direct access to app ports
sudo ufw deny 3001
sudo ufw deny 3002
```

### **2. Environment Secrets:**
```bash
# NEVER commit .env to git
# Use strong JWT_SECRET (32+ characters)
# Rotate secrets regularly
```

### **3. Rate Limiting:**
Already configured in `nginx.conf`:
- API: 100 req/s
- Login: 5 req/min

### **4. HTTPS/SSL:**
```bash
# Pakai Let's Encrypt (gratis)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d sitabi.pnp.ac.id
```

---

## 📈 Scaling (Optional)

Jika traffic tinggi, scale dengan PM2 cluster mode:

```javascript
// ecosystem.config.cjs
module.exports = {
  apps: [{
    name: 'sita-bi-backend',
    script: './dist/server.js',
    instances: 'max',  // Use all CPU cores
    exec_mode: 'cluster',  // Enable load balancing
  }]
};
```

---

## 🆘 Support & Maintenance

### **Backup:**
```bash
# Database backup (daily cron)
pg_dump sitabi > backup_$(date +%Y%m%d).sql

# Code backup
git push origin main
```

### **Log Rotation:**
```bash
# PM2 logs rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### **Updates:**
```bash
# Update dependencies
pnpm update

# Update PM2
pnpm add -g pm2@latest

# Update Nginx
sudo apt update && sudo apt upgrade nginx
```

---

## 🎓 Summary

**Architecture:**
```
Internet → Nginx (Port 80) → PM2 → Node.js Apps
                                   ├─ Backend (3002)
                                   └─ Frontend (3001)
```

**Key Points:**
1. ✅ PM2 untuk process management & auto-restart
2. ✅ Nginx untuk reverse proxy & performance
3. ✅ Environment variables untuk configuration
4. ✅ Logging & monitoring untuk troubleshooting
5. ✅ Security best practices

**Access:**
- Production URL: `http://sitabi.pnp.ac.id` (via Nginx)
- Direct backend: `http://localhost:3002` (internal only)
- Direct frontend: `http://localhost:3001` (internal only)

---

## 📞 Quick Commands Reference

```bash
# Deploy/Update
pnpm run build && pm2 reload all

# Monitor
pm2 monit

# Logs
pm2 logs --lines 100

# Restart
pm2 restart all

# Stop
pm2 stop all

# Status
pm2 status && nginx -t
```

---

**🎉 Selamat! Aplikasi SITA-BI sudah production-ready!**
