const express = require('express');
const router = express.Router();
const { enrollInCourse, getMyCourses, updateProgress } = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/enroll', protect, authorize('student'), enrollInCourse);
router.get('/my-courses', protect, authorize('student'), getMyCourses);
router.put('/:id/progress', protect, authorize('student'), updateProgress);

module.exports = router;
