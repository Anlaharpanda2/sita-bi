/**
 * PM2 Production Setup untuk Windows + Turborepo
 * 
 * Approach:
 * 1. Backend: Run compiled Node.js directly
 * 2. Frontend: Gunakan standalone Next.js build (tidak perlu pnpm di production)
 * 3. Monorepo: Fix tsconfig path resolution
 */

module.exports = {
  apps: [
    {
      name: 'sita-bi-backend',
      cwd: './apps/api',
      script: 'dist/server.js',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      kill_timeout: 30000,
    },
    {
      name: 'sita-bi-frontend',
      cwd: './apps/web',
      script: '.next/standalone/server.js',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        HOSTNAME: 'localhost',
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      kill_timeout: 30000,
    },
  ],
};