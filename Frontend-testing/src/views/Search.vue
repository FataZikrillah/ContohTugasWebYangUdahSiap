<template>
  <div class="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-6">
          <svg class="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-slate-900 mb-4">Pencarian Buku</h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">Temukan buku yang Anda cari dengan mudah menggunakan sistem pencarian yang powerful dan intuitif</p>
      </div>
      
      <div class="mb-12">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">Pencarian Buku</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Kata Kunci</label>
              <input v-model="searchKeyword" @keyup.enter="performSearch" type="text" placeholder="Masukkan judul, pengarang, atau kata kunci..." class="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white shadow-sm transition-all duration-200 text-slate-900 placeholder-slate-400">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Cari Berdasarkan</label>
              <select v-model="searchField" class="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white shadow-sm transition-all duration-200 text-slate-900 cursor-pointer">
                <option value="all">Semua Field</option>
                <option value="id">ID Buku</option>
                <option value="title">Judul Buku</option>
                <option value="author">Pengarang</option>
                <option value="category">Kategori</option>
              </select>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <button @click="performSearch" class="bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Cari Buku
            </button>
            <button @click="clearSearch" class="bg-slate-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200">
              Bersihkan
            </button>
          </div>
        </div>
      </div>

      <div v-if="searchResults.length > 0" class="bg-white rounded-lg shadow-md mb-8">
        <div class="p-6 border-b">
          <h2 class="text-xl font-semibold text-blue-600">Hasil Pencarian Buku</h2>
          <p class="text-sm text-gray-600 mt-1">Ditemukan {{ searchResults.length }} buku dengan kata kunci "{{ searchKeyword }}"</p>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengarang</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="book in searchResults" :key="book.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{{ book.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ book.title }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ book.author }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{{ book.category }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ book.isbn }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ book.year }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span :class="book.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ book.stock }} tersedia
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="showNoResults" class="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">Tidak Ada Hasil</h3>
        <p class="text-gray-500">Pencarian tidak menemukan buku yang sesuai dengan kriteria.</p>
      </div>

      <div v-if="!searchResults.length && !showNoResults" class="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-800 mb-2">Tips Pencarian:</h3>
        <ul class="text-blue-700 space-y-1">
          <li>• Pilih "Semua Field" untuk mencari di semua informasi buku</li>
          <li>• Gunakan "ID Buku" untuk mencari berdasarkan kode buku (contoh: B001)</li>
          <li>• Pilih "Judul Buku" untuk mencari berdasarkan nama buku</li>
          <li>• Gunakan "Pengarang" untuk mencari berdasarkan nama penulis</li>
          <li>• Pilih "Kategori" untuk mencari berdasarkan jenis buku</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import bookService from '../services/bookService';

const searchKeyword = ref('');
const searchField = ref('all');
const searchResults = ref([]);
const showNoResults = ref(false);
const isSearching = ref(false);

const performSearch = async () => {
  if (!searchKeyword.value.trim()) {
    alert('Masukkan kata kunci pencarian');
    return;
  }

  isSearching.value = true;
  showNoResults.value = false;

  try {
    const response = await bookService.getAll();
    const allBooks = response.data.data || response.data;
    
    const keyword = searchKeyword.value.toLowerCase().trim();
    let foundBooks = [];

    if (searchField.value === 'all') {
      foundBooks = allBooks.filter(book => 
        book.id.toString().toLowerCase().includes(keyword) ||
        book.judul.toLowerCase().includes(keyword) || 
        book.isbn.toLowerCase().includes(keyword) ||
        book.tahun_terbit.toString().includes(keyword)
      );
    } else if (searchField.value === 'id') {
      foundBooks = allBooks.filter(book => book.id.toString().toLowerCase().includes(keyword));
    } else if (searchField.value === 'title') {
      foundBooks = allBooks.filter(book => book.judul.toLowerCase().includes(keyword));
    } else if (searchField.value === 'category') {
      foundBooks = allBooks.filter(book => book.kategori_id.toString().includes(keyword));
    }

    searchResults.value = foundBooks.map(book => ({
      id: book.id,
      title: book.judul,
      author: 'Author ID: ' + (book.author_id || '-'),
      category: 'Kategori ID: ' + book.kategori_id,
      isbn: book.isbn,
      year: book.tahun_terbit,
      stock: book.stok
    }));

    showNoResults.value = foundBooks.length === 0;
  } catch (error) {
    console.error('Error searching books:', error);
    alert('Gagal melakukan pencarian. Pastikan backend sudah berjalan.');
  } finally {
    isSearching.value = false;
  }
};

const clearSearch = () => {
  searchKeyword.value = '';
  searchField.value = 'all';
  searchResults.value = [];
  showNoResults.value = false;
};
</script>
