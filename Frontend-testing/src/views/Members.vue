
<template>
  <div class="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-4">Manajemen Anggota</h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">Kelola data anggota perpustakaan dengan mudah. Daftarkan anggota baru dan lihat informasi lengkap</p>
      </div>

      <!-- Alert Messages -->
      <div v-if="alertMessage" class="mb-6 p-4 rounded-xl" :class="alertType === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'">
        {{ alertMessage }}
      </div>
      
      <!-- Form Tambah Anggota - Hidden jika belum login -->
      <div v-if="isLoggedIn" class="mb-12">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">Tambah Anggota Baru</h2>
          
          <form @submit.prevent="addMember" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">NIM</label>
              <input v-model="form.nim" type="text" required placeholder="Masukkan NIM" class="w-full text-slate-900 placeholder:text-slate-400 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Nama Lengkap</label>
              <input v-model="form.nama" type="text" required placeholder="Masukkan nama lengkap" class="w-full text-slate-900 placeholder:text-slate-400 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Email</label>
              <input v-model="form.email" type="email" required placeholder="contoh@email.com" class="w-full text-slate-900 placeholder:text-slate-400 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Nomor Telepon</label>
              <input v-model="form.telepon" type="tel" placeholder="08123456789" class="w-full text-slate-900 placeholder:text-slate-400 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Status Keanggotaan</label>
              <select v-model="form.status_keanggotaan" required class="w-full text-slate-900 placeholder:text-slate-400 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
                <option value="">Pilih Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Non-Aktif">Non-Aktif</option>
                <option value="Diblokir">Diblokir</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Foto Profil (URL)</label>
              <input v-model="form.foto_profil" type="text" placeholder="https://example.com/foto.jpg" class="w-full text-slate-900 placeholder:text-slate-400 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200">
            </div>
            
            <div class="space-y-2 md:col-span-2">
              <label class="block text-sm font-semibold text-slate-700">Alamat Lengkap</label>
              <textarea v-model="form.alamat" placeholder="Masukkan alamat lengkap" class="w-full text-slate-900 placeholder:text-slate-400 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200" rows="3"></textarea>
            </div>
            
            <div class="md:col-span-2 pt-4 flex gap-3">
              <button type="submit" :disabled="isSubmitting" class="bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSubmitting ? (editMode ? 'Mengupdate...' : 'Menambahkan...') : (editMode ? 'Update Anggota' : 'Tambah Anggota') }}
              </button>
              <button v-if="editMode" type="button" @click="cancelEdit" class="bg-slate-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-200">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-50 to-emerald-50 p-6 border-b border-slate-200">
          <h2 class="text-2xl font-bold text-slate-900 mb-2">Daftar Anggota Perpustakaan</h2>
          <p class="text-slate-600">Kelola dan lihat semua anggota yang terdaftar</p>
        </div>
        
        <div v-if="isLoading" class="p-8 text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
          <p class="mt-4 text-slate-600">Memuat data anggota...</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-slate-50 to-emerald-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">ID</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">NIM</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Nama Anggota</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Telepon</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                <th v-if="isLoggedIn" class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white/50 backdrop-blur-sm divide-y divide-slate-200">
              <tr v-if="members.length === 0">
                <td :colspan="isLoggedIn ? 7 : 6" class="px-6 py-8 text-center text-slate-500">
                  Belum ada data anggota
                </td>
              </tr>
              <tr v-for="member in members" :key="member.id" class="hover:bg-emerald-50/50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-slate-900">{{ member.id }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-blue-600">{{ member.nim }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-slate-900">{{ member.nama }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-slate-900">{{ member.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-slate-500">{{ member.telepon || '-' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" 
                    :class="{
                      'bg-emerald-100 text-emerald-800': member.status_keanggotaan === 'Aktif',
                      'bg-slate-100 text-slate-800': member.status_keanggotaan === 'Non-Aktif',
                      'bg-red-100 text-red-800': member.status_keanggotaan === 'Diblokir'
                    }">
                    {{ member.status_keanggotaan }}
                  </span>
                </td>
                <td v-if="isLoggedIn" class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button @click="editMember(member)" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none transition-all duration-200">
                      Edit
                    </button>
                    <button @click="deleteMember(member.id)" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none transition-all duration-200">
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
import { ref, onMounted, computed } from 'vue';
import Navbar from '../components/Navbar.vue';
import memberService from '../services/memberService';

const form = ref({
  nim: '',
  nama: '',
  email: '',
  telepon: '',
  alamat: '',
  status_keanggotaan: '',
  foto_profil: ''
});

const members = ref([]);
const isLoading = ref(false);
const isSubmitting = ref(false);
const alertMessage = ref('');
const alertType = ref('success');
const editMode = ref(false);
const editId = ref(null);

const isLoggedIn = ref(false);

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

const showAlert = (message, type = 'success') => {
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => {
    alertMessage.value = '';
  }, 5000);
};

const loadMembers = async () => {
  isLoading.value = true;
  try {
    const response = await memberService.getAll();
    members.value = response.data.data || response.data;
  } catch (error) {
    console.error('Error loading members:', error);
    showAlert('Gagal memuat data anggota. Pastikan backend sudah berjalan.', 'error');
  } finally {
    isLoading.value = false;
  }
};

const addMember = async () => {
  isSubmitting.value = true;
  try {
    if (editMode.value && editId.value) {
      await memberService.update(editId.value, form.value);
      showAlert('Anggota berhasil diupdate!', 'success');
      editMode.value = false;
      editId.value = null;
    } else {
      await memberService.create(form.value);
      showAlert('Anggota berhasil didaftarkan!', 'success');
    }
    
    // Reset form
    form.value = {
      nim: '',
      nama: '',
      email: '',
      telepon: '',
      alamat: '',
      status_keanggotaan: '',
      foto_profil: ''
    };
    
    // Reload members
    await loadMembers();
  } catch (error) {
    console.error('Error saving member:', error);
    const errorMsg = error.response?.data?.message || 'Gagal menyimpan anggota';
    showAlert(errorMsg, 'error');
  } finally {
    isSubmitting.value = false;
  }
};

const editMember = (member) => {
  editMode.value = true;
  editId.value = member.id;
  form.value = {
    nim: member.nim,
    nama: member.nama,
    email: member.email,
    telepon: member.telepon,
    alamat: member.alamat,
    status_keanggotaan: member.status_keanggotaan,
    foto_profil: member.foto_profil
  };
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const cancelEdit = () => {
  editMode.value = false;
  editId.value = null;
  form.value = {
    nim: '',
    nama: '',
    email: '',
    telepon: '',
    alamat: '',
    status_keanggotaan: '',
    foto_profil: ''
  };
};

const deleteMember = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
    try {
      await memberService.delete(id);
      showAlert('Anggota berhasil dihapus!', 'success');
      await loadMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
      showAlert('Gagal menghapus anggota', 'error');
    }
  }
};

onMounted(() => {
  checkLoginStatus();
  loadMembers();
  
  // Listen untuk perubahan login status
  window.addEventListener('storage', checkLoginStatus);
});
</script>
