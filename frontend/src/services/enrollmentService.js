import api from './api';

const enrollmentService = {
  enroll: (courseId) => api.post('/enrollments/enroll', { courseId }),
  getMyCourses: () => api.get('/enrollments/my-courses'),
  updateProgress: (enrollmentId, progress) => api.put(`/enrollments/${enrollmentId}/progress`, { progress }),
};

export default enrollmentService;
