
# API Digital Library Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
API ini menggunakan Laravel Sanctum untuk autentikasi. Untuk endpoint yang memerlukan autentikasi, sertakan token di header:
```
Authorization: Bearer {token}
```

---

## Endpoints

### 1. Admin API

#### Get All Admins
```
GET /api/admins
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "nama": "Admin Name",
            "email": "admin@example.com",
            "created_at": "2025-10-25T00:00:00.000000Z",
            "updated_at": "2025-10-25T00:00:00.000000Z"
        }
    ]
}
```

#### Create Admin
```
POST /api/admins
```

**Request Body:**
```json
{
    "nama": "Admin Name",
    "email": "admin@example.com",
    "password": "password123"
}
```

**Validation:**
- `nama`: required, string, max 255 characters
- `email`: required, email, unique
- `password`: required, string, min 6 characters

**Response:**
```json
{
    "success": true,
    "message": "Admin berhasil ditambahkan",
    "data": {
        "id": 1,
        "nama": "Admin Name",
        "email": "admin@example.com"
    }
}
```

#### Get Admin by ID
```
GET /api/admins/{id}
```

#### Update Admin
```
PUT/PATCH /api/admins/{id}
```

**Request Body:**
```json
{
    "nama": "Updated Name",
    "email": "newemail@example.com",
    "password": "newpassword"
}
```

#### Delete Admin
```
DELETE /api/admins/{id}
```

---

### 2. Kategori API

#### Get All Kategori
```
GET /api/kategori
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "nama_kategori": "Fiksi",
            "deskripsi": "Buku-buku fiksi",
            "created_at": "2025-10-25T00:00:00.000000Z",
            "updated_at": "2025-10-25T00:00:00.000000Z",
            "bukus": []
        }
    ]
}
```

#### Create Kategori
```
POST /api/kategori
```

**Request Body:**
```json
{
    "nama_kategori": "Fiksi",
    "deskripsi": "Buku-buku fiksi"
}
```

**Validation:**
- `nama_kategori`: required, string, max 255 characters
- `deskripsi`: nullable, string

#### Get Kategori by ID
```
GET /api/kategori/{id}
```

#### Update Kategori
```
PUT/PATCH /api/kategori/{id}
```

#### Delete Kategori
```
DELETE /api/kategori/{id}
```

---

### 3. Penerbit API

#### Get All Penerbit
```
GET /api/penerbit
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "nama_penerbit": "Gramedia",
            "alamat": "Jakarta",
            "telepon": "021-12345678",
            "email": "info@gramedia.com",
            "created_at": "2025-10-25T00:00:00.000000Z",
            "updated_at": "2025-10-25T00:00:00.000000Z",
            "bukus": []
        }
    ]
}
```

#### Create Penerbit
```
POST /api/penerbit
```

**Request Body:**
```json
{
    "nama_penerbit": "Gramedia",
    "alamat": "Jakarta",
    "telepon": "021-12345678",
    "email": "info@gramedia.com"
}
```

**Validation:**
- `nama_penerbit`: required, string, max 255 characters
- `alamat`: nullable, string
- `telepon`: nullable, string, max 15 characters
- `email`: nullable, email

#### Get Penerbit by ID
```
GET /api/penerbit/{id}
```

#### Update Penerbit
```
PUT/PATCH /api/penerbit/{id}
```

#### Delete Penerbit
```
DELETE /api/penerbit/{id}
```

---

### 4. Author API

#### Get All Authors
```
GET /api/authors
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "nama_author": "Andrea Hirata",
            "biografi": "Penulis Indonesia",
            "email": "andrea@example.com",
            "created_at": "2025-10-25T00:00:00.000000Z",
            "updated_at": "2025-10-25T00:00:00.000000Z",
            "bukus": []
        }
    ]
}
```

#### Create Author
```
POST /api/authors
```

**Request Body:**
```json
{
    "nama_author": "Andrea Hirata",
    "biografi": "Penulis Indonesia",
    "email": "andrea@example.com"
}
```

**Validation:**
- `nama_author`: required, string, max 255 characters
- `biografi`: nullable, string
- `email`: nullable, email

#### Get Author by ID
```
GET /api/authors/{id}
```

#### Update Author
```
PUT/PATCH /api/authors/{id}
```

#### Delete Author
```
DELETE /api/authors/{id}
```

---

### 5. Anggota API

#### Get All Anggota
```
GET /api/anggota
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "nim": "12345678",
            "nama": "John Doe",
            "email": "john@example.com",
            "alamat": "Jakarta",
            "telepon": "081234567890",
            "status_keanggotaan": "Aktif",
            "foto_profil": null,
            "created_at": "2025-10-25T00:00:00.000000Z",
            "updated_at": "2025-10-25T00:00:00.000000Z",
            "peminjamans": []
        }
    ]
}
```

#### Create Anggota
```
POST /api/anggota
```

**Request Body:**
```json
{
    "nim": "12345678",
    "nama": "John Doe",
    "email": "john@example.com",
    "alamat": "Jakarta",
    "telepon": "081234567890",
    "status_keanggotaan": "Aktif",
    "foto_profil": "path/to/photo.jpg"
}
```

**Validation:**
- `nim`: required, string, max 20 characters, unique
- `nama`: required, string, max 255 characters
- `email`: required, email, unique
- `alamat`: nullable, string
- `telepon`: nullable, string, max 15 characters
- `status_keanggotaan`: nullable, enum (Aktif, Non-Aktif, Diblokir)
- `foto_profil`: nullable, string

#### Get Anggota by ID
```
GET /api/anggota/{id}
```

#### Update Anggota
```
PUT/PATCH /api/anggota/{id}
```

#### Delete Anggota
```
DELETE /api/anggota/{id}
```

---

### 6. Buku API

#### Get All Buku
```
GET /api/buku
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "judul": "Laskar Pelangi",
            "cover_buku": "path/to/cover.jpg",
            "isbn": "978-1234567890",
            "tahun_terbit": 2005,
            "stok": 10,
            "kategori_id": 1,
            "penerbit_id": 1,
            "created_at": "2025-10-25T00:00:00.000000Z",
            "updated_at": "2025-10-25T00:00:00.000000Z",
            "kategori": {...},
            "penerbit": {...},
            "authors": [...]
        }
    ]
}
```

#### Create Buku
```
POST /api/buku
```

**Request Body:**
```json
{
    "judul": "Laskar Pelangi",
    "cover_buku": "path/to/cover.jpg",
    "isbn": "978-1234567890",
    "tahun_terbit": 2005,
    "stok": 10,
    "kategori_id": 1,
    "penerbit_id": 1
}
```

**Validation:**
- `judul`: required, string, max 255 characters
- `cover_buku`: nullable, string
- `isbn`: nullable, string, max 20 characters, unique
- `tahun_terbit`: nullable, integer
- `stok`: nullable, integer, min 0
- `kategori_id`: nullable, exists in kategoris table
- `penerbit_id`: nullable, exists in penerbits table

#### Get Buku by ID
```
GET /api/buku/{id}
```

#### Update Buku
```
PUT/PATCH /api/buku/{id}
```

#### Delete Buku
```
DELETE /api/buku/{id}
```

---

### 7. Buku Author API

#### Get All Buku-Author Relations
```
GET /api/buku-authors
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "buku_id": 1,
            "author_id": 1,
            "created_at": "2025-10-25T00:00:00.000000Z",
            "updated_at": "2025-10-25T00:00:00.000000Z",
            "buku": {...},
            "author": {...}
        }
    ]
}
```

#### Create Buku-Author Relation
```
POST /api/buku-authors
```

**Request Body:**
```json
{
    "buku_id": 1,
    "author_id": 1
}
```

**Validation:**
- `buku_id`: required, exists in bukus table
- `author_id`: required, exists in authors table
- Kombinasi buku_id dan author_id harus unik

#### Get Buku-Author by ID
```
GET /api/buku-authors/{id}
```

#### Update Buku-Author
```
PUT/PATCH /api/buku-authors/{id}
```

#### Delete Buku-Author
```
DELETE /api/buku-authors/{id}
```

---

### 8. Peminjaman API

#### Get All Peminjaman
```
GET /api/peminjaman
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "anggota_id": 1,
            "buku_id": 1,
            "tanggal_pinjam": "2025-10-25",
            "tanggal_kembali": "2025-11-01",
            "tanggal_dikembalikan": null,
            "status": "Dipinjam",
            "created_at": "2025-10-25T00:00:00.000000Z",
            "updated_at": "2025-10-25T00:00:00.000000Z",
            "anggota": {...},
            "buku": {...}
        }
    ]
}
```

#### Create Peminjaman
```
POST /api/peminjaman
```

**Request Body:**
```json
{
    "anggota_id": 1,
    "buku_id": 1,
    "tanggal_pinjam": "2025-10-25",
    "tanggal_kembali": "2025-11-01",
    "status": "Dipinjam"
}
```

**Validation:**
- `anggota_id`: required, exists in anggotas table
- `buku_id`: required, exists in bukus table
- `tanggal_pinjam`: nullable, date (default: today)
- `tanggal_kembali`: nullable, date (default: 7 days from tanggal_pinjam)
- `status`: nullable, enum (Dipinjam, Dikembalikan, Terlambat, Hilang)

**Business Logic:**
- Stok buku akan berkurang 1 saat peminjaman dibuat
- Jika stok = 0, peminjaman tidak dapat dilakukan

#### Get Peminjaman by ID
```
GET /api/peminjaman/{id}
```

#### Update Peminjaman
```
PUT/PATCH /api/peminjaman/{id}
```

**Request Body:**
```json
{
    "status": "Dikembalikan",
    "tanggal_dikembalikan": "2025-10-30"
}
```

**Business Logic:**
- Saat status diubah menjadi "Dikembalikan", stok buku akan bertambah 1
- Tanggal dikembalikan akan otomatis diisi jika tidak diberikan

#### Delete Peminjaman
```
DELETE /api/peminjaman/{id}
```

**Business Logic:**
- Jika status masih "Dipinjam", stok buku akan dikembalikan saat peminjaman dihapus

---

## Error Responses

### Validation Error (422)
```json
{
    "success": false,
    "message": "Validasi gagal",
    "errors": {
        "email": ["The email field is required."]
    }
}
```

### Not Found (404)
```json
{
    "success": false,
    "message": "Resource tidak ditemukan"
}
```

### Success Response (200/201)
```json
{
    "success": true,
    "message": "Operasi berhasil",
    "data": {...}
}
```

---

## Status Codes

- `200 OK`: Request berhasil
- `201 Created`: Resource berhasil dibuat
- `404 Not Found`: Resource tidak ditemukan
- `422 Unprocessable Entity`: Validasi gagal

---

## Testing API

Anda dapat menggunakan tools seperti:
- Postman
- Insomnia
- Thunder Client (VS Code Extension)
- cURL

**Contoh menggunakan cURL:**
```bash
# Get all books
curl -X GET http://localhost:5000/api/buku

# Create new book
curl -X POST http://localhost:5000/api/buku \
  -H "Content-Type: application/json" \
  -d '{
    "judul": "Test Book",
    "isbn": "123456789",
    "stok": 5,
    "kategori_id": 1,
    "penerbit_id": 1
  }'
```

---

## Database Relationships

### Buku
- Belongs to: Kategori, Penerbit
- Many to Many: Author (through BukuAuthor)
- Has Many: Peminjaman

### Anggota
- Has Many: Peminjaman

### Peminjaman
- Belongs to: Anggota, Buku

### Kategori
- Has Many: Buku

### Penerbit
- Has Many: Buku

### Author
- Many to Many: Buku (through BukuAuthor)

---

## Notes

1. Semua endpoint menggunakan prefix `/api`
2. Password akan di-hash menggunakan bcrypt
3. Timestamps (created_at, updated_at) otomatis dikelola oleh Laravel
4. Soft deletes tidak diimplementasikan (data akan dihapus permanen)
5. API menggunakan JSON untuk request dan response
