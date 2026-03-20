import api from './api';

const userService = {
  getAllUsers: () => api.get('/users'),
  deleteUser: (id) => api.delete(`/users/${id}`),
  updateProfile: (data) => api.put('/users/profile', data),
};

export default userService;
