
import api from './api';

const bookService = {
  // Get semua buku
  getAll() {
    return api.get('/buku');
  },

  // Get buku by ID
  getById(id) {
    return api.get(`/buku/${id}`);
  },

  // Tambah buku baru
  create(bookData) {
    return api.post('/buku', bookData);
  },

  // Update buku
  update(id, bookData) {
    return api.put(`/buku/${id}`, bookData);
  },

  // Hapus buku
  delete(id) {
    return api.delete(`/buku/${id}`);
  },

  // Search buku
  search(params) {
    return api.get('/buku/search', { params });
  }
};

export default bookService;
