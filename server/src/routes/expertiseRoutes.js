const express = require('express');
const router = express.Router();
const {
  getExpertise,
  createExpertise,
  updateExpertise,
  deleteExpertise
} = require('../controllers/expertiseController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getExpertise);
router.post('/', protect, authorize('superadmin', 'admin', 'editor'), createExpertise);
router.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), updateExpertise);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteExpertise);

module.exports = router;
