const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  addEnquiryNote,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public form submission
router.post('/', createEnquiry);

// Admin operations
router.get('/', protect, authorize('superadmin', 'admin'), getEnquiries);
router.get('/:id', protect, authorize('superadmin', 'admin'), getEnquiryById);
router.put('/:id', protect, authorize('superadmin', 'admin'), updateEnquiryStatus);
router.post('/:id/notes', protect, authorize('superadmin', 'admin'), addEnquiryNote);
router.delete('/:id', protect, authorize('superadmin'), deleteEnquiry);

module.exports = router;
