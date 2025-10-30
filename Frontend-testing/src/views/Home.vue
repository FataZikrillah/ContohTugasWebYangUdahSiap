<template>
  <div class="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-16 sm:py-20 lg:py-24">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            <span class="block">Selamat Datang di</span>
            <span class="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Perpustakaan Digital</span>
          </h1>
          <p class="text-lg sm:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Kelola koleksi buku dan data anggota perpustakaan dengan sistem yang modern, mudah digunakan, dan terintegrasi
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div class="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl"></div>
            <div class="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Manajemen Buku</h3>
            <p class="text-slate-600 mb-6 leading-relaxed">Kelola koleksi buku perpustakaan dengan fitur tambah, edit, dan pencarian yang mudah digunakan</p>
            <router-link to="/books" class="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-sm hover:shadow-md">
              Kelola Buku
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>

          <div class="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl"></div>
            <div class="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Manajemen Anggota</h3>
            <p class="text-slate-600 mb-6 leading-relaxed">Daftarkan anggota baru dan kelola data keanggotaan perpustakaan dengan sistem yang terorganisir</p>
            <router-link to="/members" class="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-sm hover:shadow-md">
              Kelola Anggota
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>

          <div class="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-t-2xl"></div>
            <div class="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Pencarian Cerdas</h3>
            <p class="text-slate-600 mb-6 leading-relaxed">Temukan buku dan data anggota dengan cepat menggunakan sistem pencarian yang powerful dan intuitif</p>
            <router-link to="/search" class="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all duration-200 shadow-sm hover:shadow-md">
              Mulai Pencarian
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
</script>
