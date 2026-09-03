const express = require('express');
const router = express.Router();
const {
  getTours,
  getTourBySlug,
  createTour,
  updateTour,
  duplicateTour,
  deleteTour
} = require('../controllers/tourController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getTours);
router.get('/:slug', getTourBySlug);
router.post('/', protect, authorize('superadmin', 'admin', 'editor'), createTour);
router.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), updateTour);
router.post('/:id/duplicate', protect, authorize('superadmin', 'admin', 'editor'), duplicateTour);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteTour);

module.exports = router;
