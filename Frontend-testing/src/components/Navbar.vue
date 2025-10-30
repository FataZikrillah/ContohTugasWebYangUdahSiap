<template>
  <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-3">
          <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Perpustakaan Digital
          </h1>
        </div>
        
        <div class="hidden md:flex items-center space-x-1">
          <router-link to="/" class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/')">Beranda</router-link>
          <router-link to="/books" class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/books')">Buku</router-link>
          <router-link to="/members" class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/members')">Anggota</router-link>
          <router-link to="/check-member" class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/check-member')">Cek Anggota</router-link>
          <router-link to="/search" class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/search')">Pencarian</router-link>
          <router-link to="/table" class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/table')">Data Tables</router-link>
          <button @click="handleAuthAction" class="ml-4 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm">
            {{ isLoggedIn ? 'Logout' : 'Login' }}
          </button>
        </div>

        <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <div v-show="mobileMenuOpen" class="md:hidden pb-4">
        <div class="space-y-2">
          <router-link to="/" class="block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/')">Beranda</router-link>
          <router-link to="/books" class="block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/books')">Buku</router-link>
          <router-link to="/members" class="block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/members')">Anggota</router-link>
          <router-link to="/check-member" class="block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/check-member')">Cek Anggota</router-link>
          <router-link to="/search" class="block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/search')">Pencarian</router-link>
          <router-link to="/table" class="block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200" :class="isActive('/table')">Data Tables</router-link>
          <button @click="handleAuthAction" class="block w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-center">
            {{ isLoggedIn ? 'Logout' : 'Login' }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const mobileMenuOpen = ref(false);

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('token');
});

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleAuthAction = () => {
  if (isLoggedIn.value) {
    // Logout
    localStorage.removeItem('token');
    alert('Anda telah logout');
    router.push('/');
  } else {
    // Login
    router.push('/login');
  }
};

const isActive = (path) => {
  return route.path === path 
    ? 'text-blue-600 bg-blue-50' 
    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50';
};
</script>
