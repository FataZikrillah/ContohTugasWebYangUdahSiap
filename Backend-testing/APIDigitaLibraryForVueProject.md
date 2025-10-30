
# Dokumentasi API Digital Library untuk Vue.js

## Base URL
```
https://your-repl-url.replit.dev/api
```

## Setup di Vue.js

### 1. Install Axios
```bash
npm install axios
```

### 2. Konfigurasi API Service (src/services/api.js)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-repl-url.replit.dev/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor untuk menambahkan token jika ada
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
```

## Endpoints dan Contoh Penggunaan

### 1. Admin

#### Get All Admins
```javascript
// GET /api/admins
import api from '@/services/api';

async function getAllAdmins() {
  try {
    const response = await api.get('/admins');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

#### Get Single Admin
```javascript
// GET /api/admins/{id}
async function getAdmin(id) {
  try {
    const response = await api.get(`/admins/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

#### Create Admin
```javascript
// POST /api/admins
async function createAdmin(data) {
  try {
    const response = await api.post('/admins', {
      nama: data.nama,              // Required, max 255 characters
      username: data.username,      // Required, unique, max 100 characters
      password: data.password,      // Required, min 8 characters
      email: data.email,           // Required, unique, valid email
      telepon: data.telepon,       // Optional, max 15 characters
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

#### Update Admin
```javascript
// PUT/PATCH /api/admins/{id}
async function updateAdmin(id, data) {
  try {
    const response = await api.put(`/admins/${id}`, data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

#### Delete Admin
```javascript
// DELETE /api/admins/{id}
async function deleteAdmin(id) {
  try {
    const response = await api.delete(`/admins/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

---

### 2. Kategori

```javascript
// GET /api/kategori - Get all categories
const getKategori = () => api.get('/kategori');

// GET /api/kategori/{id} - Get single category
const getKategoriById = (id) => api.get(`/kategori/${id}`);

// POST /api/kategori - Create category
const createKategori = (data) => api.post('/kategori', {
  nama_kategori: data.nama_kategori,  // Required, max 255 characters
  deskripsi: data.deskripsi           // Optional, text
});

// PUT /api/kategori/{id} - Update category
const updateKategori = (id, data) => api.put(`/kategori/${id}`, data);

// DELETE /api/kategori/{id} - Delete category
const deleteKategori = (id) => api.delete(`/kategori/${id}`);
```

---

### 3. Penerbit

```javascript
// GET /api/penerbit - Get all publishers
const getPenerbit = () => api.get('/penerbit');

// GET /api/penerbit/{id} - Get single publisher
const getPenerbitById = (id) => api.get(`/penerbit/${id}`);

// POST /api/penerbit - Create publisher
const createPenerbit = (data) => api.post('/penerbit', {
  nama_penerbit: data.nama_penerbit,  // Required, max 255 characters
  alamat: data.alamat,                 // Optional, text
  telepon: data.telepon,               // Optional, max 15 characters
  email: data.email                    // Optional, valid email
});

// PUT /api/penerbit/{id} - Update publisher
const updatePenerbit = (id, data) => api.put(`/penerbit/${id}`, data);

// DELETE /api/penerbit/{id} - Delete publisher
const deletePenerbit = (id) => api.delete(`/penerbit/${id}`);
```

---

### 4. Author

```javascript
// GET /api/authors - Get all authors
const getAuthors = () => api.get('/authors');

// GET /api/authors/{id} - Get single author
const getAuthorById = (id) => api.get(`/authors/${id}`);

// POST /api/authors - Create author
const createAuthor = (data) => api.post('/authors', {
  nama_author: data.nama_author,  // Required, max 255 characters
  biografi: data.biografi,        // Optional, text
  email: data.email               // Optional, valid email
});

// PUT /api/authors/{id} - Update author
const updateAuthor = (id, data) => api.put(`/authors/${id}`, data);

// DELETE /api/authors/{id} - Delete author
const deleteAuthor = (id) => api.delete(`/authors/${id}`);
```

---

### 5. Anggota

```javascript
// GET /api/anggota - Get all members
const getAnggota = () => api.get('/anggota');

// GET /api/anggota/{id} - Get single member by ID
const getAnggotaById = (id) => api.get(`/anggota/${id}`);

// POST /api/anggota - Create member
const createAnggota = (data) => api.post('/anggota', {
  nim: data.nim,                           // NIM mahasiswa (required, unique)
  nama: data.nama,                         // Nama lengkap
  email: data.email,                       // Email (required, unique)
  alamat: data.alamat,                     // Alamat (optional)
  telepon: data.telepon,                   // Nomor telepon (optional)
  status_keanggotaan: data.status_keanggotaan,  // Aktif/Non-Aktif/Diblokir
  foto_profil: data.foto_profil            // Path foto profil (optional)
});

// PUT /api/anggota/{id} - Update member
const updateAnggota = (id, data) => api.put(`/anggota/${id}`, data);

// DELETE /api/anggota/{id} - Delete member
const deleteAnggota = (id) => api.delete(`/anggota/${id}`);
```

**Contoh Request Body untuk Create/Update Anggota:**
```javascript
{
  nim: "12345678",                    // Required, unique, max 20 characters
  nama: "John Doe",                   // Required, max 255 characters
  email: "john@example.com",          // Required, unique, valid email
  alamat: "Jakarta",                  // Optional
  telepon: "081234567890",            // Optional, max 15 characters
  status_keanggotaan: "Aktif",        // Optional: Aktif, Non-Aktif, Diblokir
  foto_profil: "path/to/photo.jpg"    // Optional
}
```

**Response Example:**
```javascript
{
  success: true,
  data: {
    id: 1,
    nim: "12345678",
    nama: "John Doe",
    email: "john@example.com",
    alamat: "Jakarta",
    telepon: "081234567890",
    status_keanggotaan: "Aktif",
    foto_profil: "path/to/photo.jpg",
    created_at: "2025-10-25T00:00:00.000000Z",
    updated_at: "2025-10-25T00:00:00.000000Z",
    peminjamans: []
  }
}
```

---

### 6. Buku

```javascript
// GET /api/buku - Get all books
const getBuku = () => api.get('/buku');

// GET /api/buku/{id} - Get single book
const getBukuById = (id) => api.get(`/buku/${id}`);

// POST /api/buku - Create book
const createBuku = (data) => api.post('/buku', {
  judul: data.judul,                      // Required, max 255 characters
  isbn: data.isbn,                        // Optional, unique, max 20 characters
  tahun_terbit: data.tahun_terbit,        // Optional, year (4 digits)
  jumlah_halaman: data.jumlah_halaman,    // Optional, integer
  stok: data.stok,                        // Optional, integer, default 0
  sinopsis: data.sinopsis,                // Optional, text
  cover_buku: data.cover_buku,            // Optional, string (path)
  kategori_id: data.kategori_id,          // Optional, foreign key to kategoris
  penerbit_id: data.penerbit_id           // Optional, foreign key to penerbits
});

// PUT /api/buku/{id} - Update book
const updateBuku = (id, data) => api.put(`/buku/${id}`, data);

// DELETE /api/buku/{id} - Delete book
const deleteBuku = (id) => api.delete(`/buku/${id}`);
```

---

### 7. Buku Author (Relasi Many-to-Many)

```javascript
// GET /api/buku-authors - Get all book-author relationships
const getBukuAuthors = () => api.get('/buku-authors');

// GET /api/buku-authors/{id} - Get single relationship
const getBukuAuthorById = (id) => api.get(`/buku-authors/${id}`);

// POST /api/buku-authors - Create relationship
const createBukuAuthor = (data) => api.post('/buku-authors', {
  buku_id: data.buku_id,
  author_id: data.author_id
});

// PUT /api/buku-authors/{id} - Update relationship
const updateBukuAuthor = (id, data) => api.put(`/buku-authors/${id}`, data);

// DELETE /api/buku-authors/{id} - Delete relationship
const deleteBukuAuthor = (id) => api.delete(`/buku-authors/${id}`);
```

---

### 8. Peminjaman

```javascript
// GET /api/peminjaman - Get all loans
const getPeminjaman = () => api.get('/peminjaman');

// GET /api/peminjaman/{id} - Get single loan
const getPeminjamanById = (id) => api.get(`/peminjaman/${id}`);

// POST /api/peminjaman - Create loan
const createPeminjaman = (data) => api.post('/peminjaman', {
  anggota_id: data.anggota_id,              // Required, foreign key to anggotas
  buku_id: data.buku_id,                    // Required, foreign key to bukus
  tanggal_pinjam: data.tanggal_pinjam,      // Required, date
  tanggal_kembali: data.tanggal_kembali,    // Required, date
  tanggal_dikembalikan: data.tanggal_dikembalikan,  // Optional, date
  status: data.status                        // Optional: Dipinjam, Dikembalikan, Terlambat
});

// PUT /api/peminjaman/{id} - Update loan
const updatePeminjaman = (id, data) => api.put(`/peminjaman/${id}`, data);

// DELETE /api/peminjaman/{id} - Delete loan
const deletePeminjaman = (id) => api.delete(`/peminjaman/${id}`);
```

---

## Contoh Service Lengkap (src/services/libraryService.js)

```javascript
import api from './api';

export default {
  // Admin
  admin: {
    getAll: () => api.get('/admins'),
    getById: (id) => api.get(`/admins/${id}`),
    create: (data) => api.post('/admins', data),
    update: (id, data) => api.put(`/admins/${id}`, data),
    delete: (id) => api.delete(`/admins/${id}`)
  },

  // Kategori
  kategori: {
    getAll: () => api.get('/kategori'),
    getById: (id) => api.get(`/kategori/${id}`),
    create: (data) => api.post('/kategori', data),
    update: (id, data) => api.put(`/kategori/${id}`, data),
    delete: (id) => api.delete(`/kategori/${id}`)
  },

  // Penerbit
  penerbit: {
    getAll: () => api.get('/penerbit'),
    getById: (id) => api.get(`/penerbit/${id}`),
    create: (data) => api.post('/penerbit', data),
    update: (id, data) => api.put(`/penerbit/${id}`, data),
    delete: (id) => api.delete(`/penerbit/${id}`)
  },

  // Authors
  authors: {
    getAll: () => api.get('/authors'),
    getById: (id) => api.get(`/authors/${id}`),
    create: (data) => api.post('/authors', data),
    update: (id, data) => api.put(`/authors/${id}`, data),
    delete: (id) => api.delete(`/authors/${id}`)
  },

  // Anggota
  anggota: {
    getAll: () => api.get('/anggota'),
    getById: (id) => api.get(`/anggota/${id}`),
    create: (data) => api.post('/anggota', data),
    update: (id, data) => api.put(`/anggota/${id}`, data),
    delete: (id) => api.delete(`/anggota/${id}`)
  },

  // Buku
  buku: {
    getAll: () => api.get('/buku'),
    getById: (id) => api.get(`/buku/${id}`),
    create: (data) => api.post('/buku', data),
    update: (id, data) => api.put(`/buku/${id}`, data),
    delete: (id) => api.delete(`/buku/${id}`)
  },

  // Buku Authors
  bukuAuthors: {
    getAll: () => api.get('/buku-authors'),
    getById: (id) => api.get(`/buku-authors/${id}`),
    create: (data) => api.post('/buku-authors', data),
    update: (id, data) => api.put(`/buku-authors/${id}`, data),
    delete: (id) => api.delete(`/buku-authors/${id}`)
  },

  // Peminjaman
  peminjaman: {
    getAll: () => api.get('/peminjaman'),
    getById: (id) => api.get(`/peminjaman/${id}`),
    create: (data) => api.post('/peminjaman', data),
    update: (id, data) => api.put(`/peminjaman/${id}`, data),
    delete: (id) => api.delete(`/peminjaman/${id}`)
  }
};
```

---

## Contoh Penggunaan di Vue Component

### Composition API (Vue 3)

```vue
<template>
  <div>
    <h2>Daftar Buku</h2>
    <button @click="loadBooks">Refresh</button>
    
    <div v-if="loading">Loading...</div>
    
    <ul v-else>
      <li v-for="buku in books" :key="buku.id">
        {{ buku.judul }} - {{ buku.tahun_terbit }}
        <button @click="editBook(buku.id)">Edit</button>
        <button @click="deleteBook(buku.id)">Delete</button>
      </li>
    </ul>

    <!-- Form tambah buku -->
    <form @submit.prevent="createBook">
      <input v-model="form.judul" placeholder="Judul" required>
      <input v-model="form.isbn" placeholder="ISBN" required>
      <input v-model="form.tahun_terbit" placeholder="Tahun Terbit" type="number">
      <button type="submit">Tambah Buku</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import libraryService from '@/services/libraryService';

const books = ref([]);
const loading = ref(false);
const form = ref({
  judul: '',
  isbn: '',
  tahun_terbit: '',
  jumlah_halaman: 0,
  stok: 1,
  deskripsi: '',
  kategori_id: 1,
  penerbit_id: 1
});

const loadBooks = async () => {
  loading.value = true;
  try {
    const response = await libraryService.buku.getAll();
    books.value = response.data;
  } catch (error) {
    console.error('Error loading books:', error);
    alert('Gagal memuat data buku');
  } finally {
    loading.value = false;
  }
};

const createBook = async () => {
  try {
    await libraryService.buku.create(form.value);
    alert('Buku berhasil ditambahkan');
    loadBooks();
    // Reset form
    form.value = {
      judul: '',
      isbn: '',
      tahun_terbit: '',
      jumlah_halaman: 0,
      stok: 1,
      deskripsi: '',
      kategori_id: 1,
      penerbit_id: 1
    };
  } catch (error) {
    console.error('Error creating book:', error);
    alert('Gagal menambahkan buku');
  }
};

const deleteBook = async (id) => {
  if (confirm('Yakin ingin menghapus buku ini?')) {
    try {
      await libraryService.buku.delete(id);
      alert('Buku berhasil dihapus');
      loadBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Gagal menghapus buku');
    }
  }
};

onMounted(() => {
  loadBooks();
});
</script>
```

---

## Response Format

Semua endpoint mengembalikan JSON dengan format standar:

### Success Response
```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": [...] atau {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Pesan error",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

---

## Error Handling

```javascript
async function handleApiCall() {
  try {
    const response = await libraryService.buku.getAll();
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      
      if (error.response.status === 404) {
        alert('Data tidak ditemukan');
      } else if (error.response.status === 422) {
        alert('Validasi gagal: ' + JSON.stringify(error.response.data.errors));
      } else if (error.response.status === 500) {
        alert('Server error');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response:', error.request);
      alert('Tidak ada respon dari server');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      alert('Terjadi kesalahan: ' + error.message);
    }
  }
}
```

---

## Catatan Penting

1. **CORS**: API sudah dikonfigurasi untuk menerima request dari semua origin. Untuk production, ubah konfigurasi di `config/cors.php`

2. **Base URL**: Ganti `your-repl-url.replit.dev` dengan URL Repl Anda yang sebenarnya

3. **Authentication**: Jika menggunakan authentication, tambahkan token ke localStorage dan akan otomatis ditambahkan ke setiap request via interceptor

4. **Validation**: Semua input akan divalidasi di sisi server. Pastikan data yang dikirim sesuai dengan struktur yang diharapkan

5. **Timestamps**: Setiap record memiliki `created_at` dan `updated_at` yang otomatis dikelola oleh Laravel

6. **Soft Deletes**: Beberapa model mungkin menggunakan soft deletes, jadi data tidak benar-benar dihapus dari database

---

## Testing API dengan Postman

Untuk testing, Anda bisa menggunakan Postman dengan konfigurasi berikut:

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Example Request Body (POST /api/buku):**
```json
{
  "judul": "Laravel untuk Pemula",
  "isbn": "978-123-456-789-0",
  "tahun_terbit": 2024,
  "jumlah_halaman": 350,
  "stok": 5,
  "sinopsis": "Buku panduan Laravel untuk pemula",
  "cover_buku": "path/to/cover.jpg",
  "kategori_id": 1,
  "penerbit_id": 1
}
```

**Complete Field Reference for All Endpoints:**

### Admin Fields:
- `nama`: string, required, max 255
- `username`: string, required, unique, max 100
- `password`: string, required, min 8
- `email`: string, required, unique, valid email
- `telepon`: string, optional, max 15
- `role`: enum, optional (Admin, Superadmin, Operator)
- `foto_profil`: string, optional

### Kategori Fields:
- `nama_kategori`: string, required, max 255
- `deskripsi`: text, optional

### Penerbit Fields:
- `nama_penerbit`: string, required, max 255
- `alamat`: text, optional
- `telepon`: string, optional, max 15
- `email`: string, optional, valid email

### Author Fields:
- `nama_author`: string, required, max 255
- `biografi`: text, optional
- `email`: string, optional, valid email

### Anggota Fields:
- `nim`: string, required, unique, max 20
- `nama`: string, required, max 255
- `email`: string, required, unique, valid email
- `alamat`: text, optional
- `telepon`: string, optional, max 15
- `status_keanggotaan`: enum, optional (Aktif, Non-Aktif, Diblokir), default: Aktif
- `foto_profil`: string, optional

### Buku Fields:
- `judul`: string, required, max 255
- `isbn`: string, optional, unique, max 20
- `tahun_terbit`: year, optional
- `jumlah_halaman`: integer, optional
- `stok`: integer, optional, default 0
- `sinopsis`: text, optional
- `cover_buku`: string, optional
- `kategori_id`: foreign key, optional
- `penerbit_id`: foreign key, optional

### Buku-Author Fields:
- `buku_id`: foreign key, required
- `author_id`: foreign key, required
- Unique combination of buku_id and author_id

### Peminjaman Fields:
- `anggota_id`: foreign key, required
- `buku_id`: foreign key, required
- `tanggal_pinjam`: date, required
- `tanggal_kembali`: date, required
- `tanggal_dikembalikan`: date, optional
- `status`: enum, optional (Dipinjam, Dikembalikan, Terlambat), default: Dipinjam
