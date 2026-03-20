const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getCourses).post(protect, authorize('instructor', 'admin'), createCourse);
router.route('/:id').get(getCourseById).put(protect, authorize('instructor', 'admin'), updateCourse).delete(protect, authorize('instructor', 'admin'), deleteCourse);

module.exports = router;
