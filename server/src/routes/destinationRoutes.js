const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination
} = require('../controllers/destinationController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getDestinations);
router.get('/:slug', getDestinationBySlug);
router.post('/', protect, authorize('superadmin', 'admin', 'editor'), createDestination);
router.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), updateDestination);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteDestination);

module.exports = router;
