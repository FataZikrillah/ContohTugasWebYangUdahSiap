
import api from './api';

const kategoriService = {
  getAll() {
    return api.get('/kategori');
  },

  getById(id) {
    return api.get(`/kategori/${id}`);
  },

  create(data) {
    return api.post('/kategori', data);
  },

  update(id, data) {
    return api.put(`/kategori/${id}`, data);
  },

  delete(id) {
    return api.delete(`/kategori/${id}`);
  }
};

export default kategoriService;
