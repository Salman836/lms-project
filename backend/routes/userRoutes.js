const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, updateProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(protect, authorize('admin'), getUsers);
router.route('/profile').put(protect, updateProfile);
router.route('/:id').delete(protect, authorize('admin'), deleteUser);

module.exports = router;
