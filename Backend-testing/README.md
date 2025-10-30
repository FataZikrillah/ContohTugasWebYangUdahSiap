
# Digital Library API - Laravel

API Backend untuk sistem perpustakaan digital yang dibangun dengan Laravel 12.

## Deskripsi

Aplikasi ini menyediakan RESTful API untuk mengelola sistem perpustakaan digital, termasuk manajemen buku, anggota, peminjaman, kategori, penerbit, dan author.

## Fitur

- Manajemen Admin
- Manajemen Kategori Buku
- Manajemen Penerbit
- Manajemen Author
- Manajemen Anggota
- Manajemen Buku
- Relasi Buku-Author (Many-to-Many)
- Manajemen Peminjaman Buku
- RESTful API dengan response JSON standar
- CORS enabled untuk integrasi frontend
- Database SQLite (mudah untuk development)

## Tech Stack

- **Framework**: Laravel 12.x
- **PHP Version**: 8.2+
- **Database**: SQLite
- **Authentication**: Laravel Sanctum (ready)
- **Frontend Build**: Vite

## Instalasi di Local

### Prerequisites

Pastikan Anda sudah menginstall:

- PHP >= 8.2
- Composer
- Node.js & NPM (untuk build assets)
- SQLite3

### Langkah Instalasi

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies PHP**

   ```bash
   composer install
   ```

3. **Install Dependencies Node.js**

   ```bash
   npm install
   ```

4. **Setup Environment File**

   Copy file `.env.example` menjadi `.env`:

   ```bash
   cp .env.example .env
   ```

5. **Generate Application Key**

   ```bash
   php artisan key:generate
   ```

6. **Setup Database**

   Buat file database SQLite:

   ```bash
   touch database/database.sqlite
   ```

   Atau di Windows:

   ```bash
   type nul > database/database.sqlite
   ```

7. **Jalankan Migrasi Database**

   ```bash
   php artisan migrate
   ```

8. **Jalankan Seeder (Optional)**

   Untuk mengisi database dengan data dummy:

   ```bash
   php artisan db:seed
   ```

   Atau jalankan seeder spesifik:

   ```bash
   php artisan db:seed --class=AdminSeeder
   php artisan db:seed --class=KategoriSeeder
   php artisan db:seed --class=PenerbitSeeder
   php artisan db:seed --class=AuthorSeeder
   php artisan db:seed --class=AnggotaSeeder
   php artisan db:seed --class=BukuSeeder
   php artisan db:seed --class=BukuAuthorSeeder
   php artisan db:seed --class=PeminjamanSeeder
   ```

9. **Build Assets Frontend**

   ```bash
   npm run build
   ```

10. **Jalankan Development Server**

    Untuk development, jalankan 2 command berikut di terminal terpisah:

    **Terminal 1 - Laravel Server:**
    ```bash
    php artisan serve
    ```

    **Terminal 2 - Vite Dev Server:**
    ```bash
    npm run dev
    ```

    Atau gunakan single command (jika sudah setup concurrently):
    ```bash
    npm run dev
    ```

11. **Akses Aplikasi**

    - API: `http://localhost:8000/api`
    - Web: `http://localhost:8000`

## Struktur Database

### Tables

1. **admins** - Data administrator sistem
2. **kategoris** - Kategori buku
3. **penerbits** - Data penerbit
4. **authors** - Data penulis/author
5. **anggotas** - Data anggota perpustakaan
6. **bukus** - Data buku
7. **buku_authors** - Relasi many-to-many antara buku dan author
8. **peminjamans** - Data peminjaman buku

## API Endpoints

Base URL: `http://localhost:8000/api`

### Admin
- `GET /api/admins` - Get all admins
- `GET /api/admins/{id}` - Get single admin
- `POST /api/admins` - Create admin
- `PUT /api/admins/{id}` - Update admin
- `DELETE /api/admins/{id}` - Delete admin

### Kategori
- `GET /api/kategori` - Get all categories
- `GET /api/kategori/{id}` - Get single category
- `POST /api/kategori` - Create category
- `PUT /api/kategori/{id}` - Update category
- `DELETE /api/kategori/{id}` - Delete category

### Penerbit
- `GET /api/penerbit` - Get all publishers
- `GET /api/penerbit/{id}` - Get single publisher
- `POST /api/penerbit` - Create publisher
- `PUT /api/penerbit/{id}` - Update publisher
- `DELETE /api/penerbit/{id}` - Delete publisher

### Authors
- `GET /api/authors` - Get all authors
- `GET /api/authors/{id}` - Get single author
- `POST /api/authors` - Create author
- `PUT /api/authors/{id}` - Update author
- `DELETE /api/authors/{id}` - Delete author

### Anggota
- `GET /api/anggota` - Get all members
- `GET /api/anggota/{id}` - Get single member
- `POST /api/anggota` - Create member
- `PUT /api/anggota/{id}` - Update member
- `DELETE /api/anggota/{id}` - Delete member

### Buku
- `GET /api/buku` - Get all books
- `GET /api/buku/{id}` - Get single book
- `POST /api/buku` - Create book
- `PUT /api/buku/{id}` - Update book
- `DELETE /api/buku/{id}` - Delete book

### Buku Authors (Relasi)
- `GET /api/buku-authors` - Get all book-author relationships
- `GET /api/buku-authors/{id}` - Get single relationship
- `POST /api/buku-authors` - Create relationship
- `PUT /api/buku-authors/{id}` - Update relationship
- `DELETE /api/buku-authors/{id}` - Delete relationship

### Peminjaman
- `GET /api/peminjaman` - Get all loans
- `GET /api/peminjaman/{id}` - Get single loan
- `POST /api/peminjaman` - Create loan
- `PUT /api/peminjaman/{id}` - Update loan
- `DELETE /api/peminjaman/{id}` - Delete loan

## Testing API

### Menggunakan cURL

```bash
# Get all books
curl -X GET http://localhost:8000/api/buku \
  -H "Accept: application/json"

# Create new book
curl -X POST http://localhost:8000/api/buku \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "judul": "Laravel untuk Pemula",
    "isbn": "978-123-456-789-0",
    "tahun_terbit": 2024,
    "jumlah_halaman": 350,
    "stok": 5,
    "deskripsi": "Buku panduan Laravel",
    "kategori_id": 1,
    "penerbit_id": 1
  }'
```

### Menggunakan Postman

1. Import collection dari file `APIDigitaLibrary.md`
2. Set base URL ke `http://localhost:8000/api`
3. Set headers:
   - `Content-Type: application/json`
   - `Accept: application/json`

## CORS Configuration

CORS sudah dikonfigurasi untuk menerima request dari semua origin. Untuk production, edit file `config/cors.php`:

```php
'allowed_origins' => ['https://your-frontend-domain.com'],
```

## Integrasi dengan Frontend

Lihat dokumentasi lengkap untuk integrasi dengan Vue.js di file [APIDigitaLibraryForVueProject.md](APIDigitaLibraryForVueProject.md)

## Development

### Menjalankan Migration Fresh

```bash
php artisan migrate:fresh --seed
```

### Clear Cache

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### Generate Controller Baru

```bash
php artisan make:controller NamaController --api
```

### Generate Model Baru

```bash
php artisan make:model NamaModel -m
```

## Troubleshooting

### Error: Database not found

Pastikan file `database/database.sqlite` sudah dibuat.

### Error: SQLSTATE[HY000]: General error: 1 no such table

Jalankan migrasi: `php artisan migrate`

### Error: Port 8000 already in use

Gunakan port lain: `php artisan serve --port=8001`

### CORS Error

Pastikan file `config/cors.php` sudah dikonfigurasi dengan benar.

## Production Deployment

### Di Replit

1. Pastikan semua environment variables sudah diset
2. Jalankan `composer install --optimize-autoloader --no-dev`
3. Jalankan `php artisan config:cache`
4. Jalankan `php artisan route:cache`
5. Jalankan `php artisan view:cache`
6. Set `APP_ENV=production` dan `APP_DEBUG=false`

## Dokumentasi Tambahan

- [API Documentation](APIDigitaLibrary.md) - Dokumentasi lengkap API
- [Vue.js Integration Guide](APIDigitaLibraryForVueProject.md) - Panduan integrasi dengan Vue.js

## Support

Untuk pertanyaan atau issues, silakan buat issue di repository ini.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
