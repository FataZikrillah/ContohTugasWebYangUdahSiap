
<template>
  <div class="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-4">Data Tables Perpustakaan</h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">Lihat data koleksi buku dan anggota dalam format tabel interaktif</p>
      </div>

      <!-- Tabs -->
      <div class="mb-8 flex space-x-2 border-b border-slate-200">
        <button 
          @click="activeTab = 'books'" 
          :class="activeTab === 'books' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600'"
          class="px-6 py-3 font-semibold transition-colors duration-200">
          Daftar Buku
        </button>
        <button 
          @click="activeTab = 'members'" 
          :class="activeTab === 'members' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600'"
          class="px-6 py-3 font-semibold transition-colors duration-200">
          Daftar Anggota
        </button>
      </div>

      <!-- Books Table -->
      <div v-if="activeTab === 'books'" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
          <h2 class="text-2xl font-bold text-slate-900">Daftar Koleksi Buku</h2>
          <p class="text-slate-600 mt-1">Data lengkap semua buku dalam perpustakaan</p>
        </div>

        <div v-if="isLoadingBooks" class="p-8 text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
          <p class="mt-4 text-slate-600">Memuat data buku...</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-slate-50 to-blue-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">ID</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Judul</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">ISBN</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Tahun</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Kategori</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Stok</th>
              </tr>
            </thead>
            <tbody class="bg-white/50 backdrop-blur-sm divide-y divide-slate-200">
              <tr v-if="books.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-slate-500">Belum ada data buku</td>
              </tr>
              <tr v-for="book in books" :key="book.id" class="hover:bg-blue-50/50 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-slate-900">{{ book.id }}</td>
                <td class="px-6 py-4 text-sm text-slate-900">{{ book.judul }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ book.isbn }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ book.tahun_terbit }}</td>
                <td class="px-6 py-4 text-sm">
                  <span class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    ID: {{ book.kategori_id }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm">
                  <span :class="book.stok > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'" 
                        class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ book.stok }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Members Table -->
      <div v-if="activeTab === 'members'" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-50 to-emerald-50 p-6 border-b border-slate-200">
          <h2 class="text-2xl font-bold text-slate-900">Daftar Anggota</h2>
          <p class="text-slate-600 mt-1">Data lengkap semua anggota perpustakaan</p>
        </div>

        <div v-if="isLoadingMembers" class="p-8 text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p class="mt-4 text-slate-600">Memuat data anggota...</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-slate-50 to-emerald-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">ID</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Nama</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Email</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">No. Telp</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Alamat</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Tgl Daftar</th>
              </tr>
            </thead>
            <tbody class="bg-white/50 backdrop-blur-sm divide-y divide-slate-200">
              <tr v-if="members.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-slate-500">Belum ada data anggota</td>
              </tr>
              <tr v-for="member in members" :key="member.id" class="hover:bg-emerald-50/50 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-slate-900">{{ member.id }}</td>
                <td class="px-6 py-4 text-sm text-slate-900">{{ member.nama_lengkap }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ member.email }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ member.no_telp }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ member.alamat }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ formatDate(member.tgl_daftar) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Navbar from '../components/Navbar.vue';
import bookService from '../services/bookService';
import memberService from '../services/memberService';

const activeTab = ref('books');
const books = ref([]);
const members = ref([]);
const isLoadingBooks = ref(false);
const isLoadingMembers = ref(false);

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const loadBooks = async () => {
  isLoadingBooks.value = true;
  try {
    const response = await bookService.getAll();
    books.value = response.data.data || response.data;
  } catch (error) {
    console.error('Error loading books:', error);
  } finally {
    isLoadingBooks.value = false;
  }
};

const loadMembers = async () => {
  isLoadingMembers.value = true;
  try {
    const response = await memberService.getAll();
    members.value = response.data.data || response.data;
  } catch (error) {
    console.error('Error loading members:', error);
  } finally {
    isLoadingMembers.value = false;
  }
};

watch(activeTab, (newTab) => {
  if (newTab === 'books' && books.value.length === 0) {
    loadBooks();
  } else if (newTab === 'members' && members.value.length === 0) {
    loadMembers();
  }
});

onMounted(() => {
  loadBooks();
});
</script>
