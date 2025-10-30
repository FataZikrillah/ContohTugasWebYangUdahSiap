<template>
  <div class="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-4">Manajemen Buku</h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">Kelola koleksi buku perpustakaan dengan mudah. Tambahkan buku baru dan lihat daftar lengkap koleksi</p>
      </div>

      <!-- Alert Messages -->
      <div v-if="alertMessage" class="mb-6 p-4 rounded-xl" :class="alertType === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'">
        {{ alertMessage }}
      </div>
      
      <!-- Form Tambah Buku - Hidden jika belum login -->
      <div v-if="isLoggedIn" class="mb-12">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">Tambah Buku Baru</h2>
          
          <form @submit.prevent="addBook" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Judul Buku</label>
              <input v-model="form.judul" type="text" required placeholder="Masukkan judul buku" class="text-slate-900 placeholder:text-slate-400 w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">ISBN</label>
              <input v-model="form.isbn" type="text" required placeholder="Nomor ISBN" class="text-slate-900 placeholder:text-slate-400 w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Tahun Terbit</label>
              <input v-model="form.tahun_terbit" type="number" required placeholder="2025" min="1900" max="2030" class="text-slate-900 placeholder:text-slate-400 w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Jumlah Halaman</label>
              <input v-model="form.jumlah_halaman" type="number" required placeholder="Jumlah halaman" min="1" class="text-slate-900 placeholder:text-slate-400 w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Kategori</label>
              <select v-model="form.kategori_id" required class="text-slate-900 placeholder:text-slate-400 w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
                <option value="">Pilih Kategori</option>
                <option v-for="kategori in kategoris" :key="kategori.id" :value="kategori.id">
                  {{ kategori.nama_kategori }}
                </option>
              </select>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Penerbit</label>
              <select v-model="form.penerbit_id" required class="text-slate-900 placeholder:text-slate-400 w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
                <option value="">Pilih Penerbit</option>
                <option v-for="penerbit in penerbits" :key="penerbit.id" :value="penerbit.id">
                  {{ penerbit.nama_penerbit }}
                </option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Jumlah Stok</label>
              <input v-model="form.stok" type="number" required placeholder="Jumlah eksemplar" min="1" class="text-slate-900 placeholder:text-slate-400 w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
            </div>
            
            <div class="md:col-span-2 space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Deskripsi</label>
              <textarea v-model="form.deskripsi" rows="3" placeholder="Deskripsi buku" class="text-slate-900 placeholder:text-slate-400 w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200"></textarea>
            </div>
            
            <div class="md:col-span-2 pt-4 flex gap-3">
              <button type="submit" :disabled="isSubmitting" class="bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSubmitting ? (editMode ? 'Mengupdate...' : 'Menambahkan...') : (editMode ? 'Update Buku' : 'Tambah Buku') }}
              </button>
              <button v-if="editMode" type="button" @click="cancelEdit" class="bg-slate-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-200">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
          <h2 class="text-2xl font-bold text-slate-900 mb-2">Daftar Koleksi Buku</h2>
          <p class="text-slate-600">Kelola dan lihat semua buku dalam perpustakaan</p>
        </div>
        
        <div v-if="isLoading" class="p-8 text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
          <p class="mt-4 text-slate-600">Memuat data buku...</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-slate-50 to-blue-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">ID Buku</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Judul & ISBN</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Kategori</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Penerbit</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Stok</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                <th v-if="isLoggedIn" class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white/50 backdrop-blur-sm divide-y divide-slate-200">
              <tr v-if="books.length === 0">
                <td :colspan="isLoggedIn ? 7 : 6" class="px-6 py-8 text-center text-slate-500">
                  Belum ada data buku
                </td>
              </tr>
              <tr v-for="book in books" :key="book.id" class="hover:bg-blue-50/50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-slate-900">{{ book.id }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-slate-900">{{ book.judul }}</span>
                    <span class="text-sm text-slate-500">{{ book.isbn }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {{ book.kategori_nama }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-slate-700">{{ book.penerbit_nama }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="text-lg font-bold text-slate-900">{{ book.stok }}</span>
                    <span class="text-sm text-slate-500 ml-1">unit</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="book.stok > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'">
                    {{ book.stok > 0 ? 'Tersedia' : 'Habis' }}
                  </span>
                </td>
                <td v-if="isLoggedIn" class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button @click="editBook(book)" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none transition-all duration-200">
                      Edit
                    </button>
                    <button @click="deleteBook(book.id)" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none transition-all duration-200">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import bookService from '../services/bookService';
import kategoriService from '../services/kategoriService';
import penerbitService from '../services/penerbitService';

const form = ref({
  judul: '',
  isbn: '',
  tahun_terbit: '',
  jumlah_halaman: '',
  stok: '',
  deskripsi: '',
  kategori_id: '',
  penerbit_id: ''
});

const books = ref([]);
const kategoris = ref([]);
const penerbits = ref([]);
const isLoading = ref(false);
const isSubmitting = ref(false);
const alertMessage = ref('');
const alertType = ref('success');
const isLoggedIn = ref(!!localStorage.getItem('token'));
const editMode = ref(false);
const editId = ref(null);

const showAlert = (message, type = 'success') => {
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => {
    alertMessage.value = '';
  }, 5000);
};

const loadBooks = async () => {
  isLoading.value = true;
  try {
    const response = await bookService.getAll();
    const booksData = response.data.data || response.data;
    
    // Ambil nama kategori dan penerbit untuk setiap buku
    for (let book of booksData) {
      try {
        const kategori = await kategoriService.getById(book.kategori_id);
        book.kategori_nama = kategori.data.data?.nama_kategori || kategori.data?.nama_kategori || 'N/A';
      } catch {
        book.kategori_nama = 'N/A';
      }
      
      try {
        const penerbit = await penerbitService.getById(book.penerbit_id);
        book.penerbit_nama = penerbit.data.data?.nama_penerbit || penerbit.data?.nama_penerbit || 'N/A';
      } catch {
        book.penerbit_nama = 'N/A';
      }
    }
    
    books.value = booksData;
  } catch (error) {
    console.error('Error loading books:', error);
    showAlert('Gagal memuat data buku. Pastikan backend sudah berjalan.', 'error');
  } finally {
    isLoading.value = false;
  }
};

const loadKategoris = async () => {
  try {
    const response = await kategoriService.getAll();
    kategoris.value = response.data.data || response.data;
  } catch (error) {
    console.error('Error loading kategoris:', error);
  }
};

const loadPenerbits = async () => {
  try {
    const response = await penerbitService.getAll();
    penerbits.value = response.data.data || response.data;
  } catch (error) {
    console.error('Error loading penerbits:', error);
  }
};

const addBook = async () => {
  isSubmitting.value = true;
  try {
    if (editMode.value && editId.value) {
      await bookService.update(editId.value, form.value);
      showAlert('Buku berhasil diupdate!', 'success');
      editMode.value = false;
      editId.value = null;
    } else {
      await bookService.create(form.value);
      showAlert('Buku berhasil ditambahkan!', 'success');
    }
    
    // Reset form
    form.value = {
      judul: '',
      isbn: '',
      tahun_terbit: '',
      jumlah_halaman: '',
      stok: '',
      deskripsi: '',
      kategori_id: '',
      penerbit_id: ''
    };
    
    // Reload books
    await loadBooks();
  } catch (error) {
    console.error('Error saving book:', error);
    const errorMsg = error.response?.data?.message || 'Gagal menyimpan buku';
    showAlert(errorMsg, 'error');
  } finally {
    isSubmitting.value = false;
  }
};

const editBook = (book) => {
  editMode.value = true;
  editId.value = book.id;
  form.value = {
    judul: book.judul,
    isbn: book.isbn,
    tahun_terbit: book.tahun_terbit,
    jumlah_halaman: book.jumlah_halaman,
    stok: book.stok,
    deskripsi: book.deskripsi,
    kategori_id: book.kategori_id,
    penerbit_id: book.penerbit_id
  };
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const cancelEdit = () => {
  editMode.value = false;
  editId.value = null;
  form.value = {
    judul: '',
    isbn: '',
    tahun_terbit: '',
    jumlah_halaman: '',
    stok: '',
    deskripsi: '',
    kategori_id: '',
    penerbit_id: ''
  };
};

const deleteBook = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
    try {
      await bookService.delete(id);
      showAlert('Buku berhasil dihapus!', 'success');
      await loadBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      showAlert('Gagal menghapus buku', 'error');
    }
  }
};

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token');
  loadBooks();
  loadKategoris();
  loadPenerbits();
  
  // Listen untuk perubahan login status
  window.addEventListener('storage', () => {
    isLoggedIn.value = !!localStorage.getItem('token');
  });
});
</script>
