<template>
  <div class="bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center p-4">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
      <div class="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-4">
          <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-2">Perpustakaan Digital</h1>
        <p class="text-slate-600">Buat akun baru Anda</p>
      </div>

      <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-2">Bergabung dengan Kami</h2>
          <p class="text-slate-600">Daftar untuk mengakses semua fitur</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-700">Nama Lengkap</label>
            <div class="relative">
              <input v-model="form.fullName" type="text" required placeholder="Masukkan nama lengkap" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200">
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-700">Email</label>
            <div class="relative">
              <input v-model="form.email" type="email" required placeholder="contoh@email.com" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200">
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-700">Username</label>
            <div class="relative">
              <input v-model="form.username" type="text" required placeholder="Pilih username unik" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200">
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-700">Password</label>
            <div class="relative">
              <input v-model="form.password" type="password" required placeholder="Minimum 8 karakter" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200">
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input v-model="form.agree" type="checkbox" required class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded">
            </div>
            <div class="ml-3 text-sm">
              <label class="text-slate-600">
                Saya setuju dengan <a href="#" class="text-emerald-600 hover:text-emerald-800 font-medium">Syarat & Ketentuan</a> dan <a href="#" class="text-emerald-600 hover:text-emerald-800 font-medium">Kebijakan Privasi</a>
              </label>
            </div>
          </div>
          
          <button type="submit" class="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <span class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Daftar Sekarang
            </span>
          </button>
        </form>
        
        <div class="mt-8 pt-6 border-t border-slate-200">
          <div class="text-center space-y-4">
            <p class="text-slate-600">
              Sudah punya akun? 
              <router-link to="/login" class="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors duration-200">Login sekarang</router-link>
            </p>
            <router-link to="/" class="inline-flex items-center text-slate-500 hover:text-slate-700 transition-colors duration-200">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Beranda
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({
  fullName: '',
  email: '',
  username: '',
  password: '',
  agree: false
});

const handleSubmit = () => {
  alert('Registrasi berhasil! Silakan login.');
  router.push('/login');
};
</script>
