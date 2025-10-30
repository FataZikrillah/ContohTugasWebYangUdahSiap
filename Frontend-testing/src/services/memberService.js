
import api from './api';

const memberService = {
  // Get semua anggota
  getAll() {
    return api.get('/anggota');
  },

  // Get anggota by ID
  getById(id) {
    return api.get(`/anggota/${id}`);
  },

  // Get anggota by NIM
  getByNim(nim) {
    return api.get(`/anggota/${nim}`);
  },

  // Tambah anggota baru
  create(memberData) {
    return api.post('/anggota', {
      nim: memberData.nim,
      nama: memberData.nama,
      email: memberData.email,
      alamat: memberData.alamat,
      telepon: memberData.telepon,
      status_keanggotaan: memberData.status_keanggotaan,
      foto_profil: memberData.foto_profil
    });
  },

  // Update anggota
  update(id, memberData) {
    return api.put(`/anggota/${id}`, memberData);
  },

  // Hapus anggota
  delete(id) {
    return api.delete(`/anggota/${id}`);
  }
};

export default memberService;
