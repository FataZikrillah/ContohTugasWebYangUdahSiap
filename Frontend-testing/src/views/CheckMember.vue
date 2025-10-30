<template>
  <div class="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
    <Navbar />
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-6">
          <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-slate-900 mb-4">Cek Status Anggota</h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">Masukkan NIM anggota untuk melihat informasi detail dan riwayat keanggotaan</p>
      </div>

      <div class="max-w-2xl mx-auto mb-12">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">Pencarian Anggota</h2>
            <p class="text-slate-600">Masukkan NIM anggota untuk mencari informasi</p>
          </div>

          <form @submit.prevent="checkMember" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">NIM Anggota</label>
              <input v-model="memberNumber" type="text" required placeholder="Contoh: NIM Anda" class="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 text-slate-900 placeholder:text-slate-400 text-lg">
            </div>

            <button type="submit" :disabled="isLoading" class="w-full bg-blue-800 text-white py-4 px-6 rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isLoading ? 'Mencari...' : 'Cek Anggota' }}
            </button>
          </form>
        </div>
      </div>

      <div v-if="memberFound && foundMember" class="max-w-4xl mx-auto">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div class="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white">Anggota Ditemukan</h3>
                <p class="text-emerald-100">Data anggota berhasil ditemukan dalam sistem</p>
              </div>
            </div>
          </div>

          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">NIM</label>
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-xl">
                  <span class="text-lg font-bold text-blue-900">{{ foundMember.nim }}</span>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Nama Lengkap</label>
                <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <span class="text-slate-900 font-medium">{{ foundMember.nama }}</span>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Email</label>
                <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <span class="text-slate-700">{{ foundMember.email }}</span>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Nomor Telepon</label>
                <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <span class="text-slate-700">{{ foundMember.telepon || '-' }}</span>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Alamat</label>
                <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <span class="text-slate-700">{{ foundMember.alamat || '-' }}</span>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Status Keanggotaan</label>
                <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" 
                    :class="{
                      'bg-emerald-100 text-emerald-800': foundMember.status_keanggotaan === 'Aktif',
                      'bg-slate-100 text-slate-800': foundMember.status_keanggotaan === 'Non-Aktif',
                      'bg-red-100 text-red-800': foundMember.status_keanggotaan === 'Diblokir'
                    }">
                    {{ foundMember.status_keanggotaan }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showError" class="max-w-2xl mx-auto">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200 p-8 text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 mb-3">Anggota Tidak Ditemukan</h3>
          <p class="text-slate-600 mb-6">NIM anggota yang Anda masukkan tidak terdaftar dalam sistem. Pastikan NIM yang dimasukkan benar.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import memberService from '../services/memberService';

const memberNumber = ref('');
const memberFound = ref(false);
const showError = ref(false);
const foundMember = ref(null);
const isLoading = ref(false);

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
};

const checkMember = async () => {
  if (!memberNumber.value.trim()) {
    alert('Masukkan NIM anggota');
    return;
  }

  isLoading.value = true;
  memberFound.value = false;
  showError.value = false;

  try {
    // Cari berdasarkan NIM
    const response = await memberService.getAll();
    const allMembers = response.data.data || response.data;
    
    // Cari anggota dengan NIM yang cocok
    const member = allMembers.find(m => m.nim === memberNumber.value.trim());
    
    if (member) {
      foundMember.value = member;
      memberFound.value = true;
    } else {
      showError.value = true;
      foundMember.value = null;
    }
  } catch (error) {
    console.error('Error checking member:', error);
    showError.value = true;
    foundMember.value = null;
  } finally {
    isLoading.value = false;
  }
};
</script>