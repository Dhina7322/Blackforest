const express = require('express');
const router = express.Router();
const {
  getServices,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getServices);
router.post('/', protect, authorize('superadmin', 'admin', 'editor'), createService);
router.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), updateService);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteService);

module.exports = router;
