const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getTestimonials);
router.post('/', protect, authorize('superadmin', 'admin', 'editor'), createTestimonial);
router.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), updateTestimonial);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteTestimonial);

module.exports = router;
