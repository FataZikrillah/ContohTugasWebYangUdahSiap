
import api from './api';

const penerbitService = {
  getAll() {
    return api.get('/penerbit');
  },

  getById(id) {
    return api.get(`/penerbit/${id}`);
  },

  create(data) {
    return api.post('/penerbit', data);
  },

  update(id, data) {
    return api.put(`/penerbit/${id}`, data);
  },

  delete(id) {
    return api.delete(`/penerbit/${id}`);
  }
};

export default penerbitService;
