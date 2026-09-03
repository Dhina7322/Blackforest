const express = require('express');
const router = express.Router();
const {
  getNavigation,
  createNavigationItem,
  updateNavigationItem,
  deleteNavigationItem
} = require('../controllers/navigationController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getNavigation);
router.post('/', protect, authorize('superadmin', 'admin'), createNavigationItem);
router.put('/:id', protect, authorize('superadmin', 'admin'), updateNavigationItem);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteNavigationItem);

module.exports = router;
