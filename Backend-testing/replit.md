# Laravel Library Management System

## Project Overview
Sistem manajemen perpustakaan berbasis web yang dibangun dengan Laravel 12, menggunakan PHP 8.2 dan Tailwind CSS v4.

## Tech Stack
- **Backend**: Laravel 12 (PHP 8.2)
- **Frontend**: Blade Templates, Tailwind CSS v4
- **Build Tool**: Vite 7
- **Database**: SQLite (development)
- **Package Manager**: Composer (PHP), NPM (Node.js)

## Project Structure
- `app/` - Laravel application code (Models, Controllers)
- `database/` - Migrations and seeders untuk database perpustakaan
- `resources/` - Views (Blade templates), CSS, dan JavaScript
- `routes/` - Route definitions
- `public/` - Public assets dan entry point (index.php)
- `config/` - Laravel configuration files

## Database Models
Aplikasi ini memiliki model untuk:
- Admin
- Anggota (Members)
- Buku (Books)
- Author
- Kategori (Categories)
- Penerbit (Publishers)
- Peminjaman (Loans)
- BukuAuthor (Book-Author pivot)

## Development Setup (Replit)

### Environment Configuration
- Development mode menggunakan SQLite database
- File `.env` sudah dikonfigurasi untuk Replit environment
- APP_URL menggunakan `${REPLIT_DEV_DOMAIN}` untuk dynamic URL

### Vite Configuration
Vite telah dikonfigurasi untuk Replit:
- `server.host: '0.0.0.0'` - Bind ke semua network interfaces
- `server.allowedHosts: true` - **CRITICAL**: Mengizinkan akses dari Replit proxy
- HMR menggunakan WSS protocol untuk hot reload

### Running the Application
Workflow "Server" menjalankan:
1. Laravel development server di port 5000
2. Vite dev server untuk asset compilation dan HMR

Command: `php artisan serve --host=0.0.0.0 --port=5000 & npm run dev`

## Deployment Configuration
- **Target**: Autoscale (stateless web application)
- **Build**: Installs dependencies dan compiles assets
- **Run**: Serves aplikasi di port 5000

### Production Considerations
Untuk production deployment:
- Set `APP_ENV=production` di environment variables
- Set `APP_DEBUG=false`
- Gunakan production database (PostgreSQL/MySQL)
- Assets akan di-build dengan `npm run build`

## Recent Changes
- **2025-10-25**: Initial Replit setup
  - Configured Vite untuk Replit proxy support
  - Created public/index.php for Laravel bootstrap
  - Configured workflow untuk concurrent Laravel + Vite
  - Setup deployment configuration

## User Preferences
- Bahasa komunikasi: Indonesian (Bahasa Indonesia)

## Notes
- Project ini adalah tugas kelompok untuk mata kuliah Pemrograman Fullstack
- Database migrations sudah dijalankan dan tables sudah dibuat
- Seeders tersedia untuk populate data sample
