const express = require('express');
const router = express.Router();
const {
  login,
  getMe,
  updateProfile,
  updatePassword,
  listUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);

// User management (Superadmin only)
router.get('/users', protect, authorize('superadmin'), listUsers);
router.post('/users', protect, authorize('superadmin'), createUser);
router.put('/users/:id', protect, authorize('superadmin'), updateUser);
router.delete('/users/:id', protect, authorize('superadmin'), deleteUser);

module.exports = router;
