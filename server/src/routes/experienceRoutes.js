const express = require('express');
const router = express.Router();
const {
  getExperiences,
  getExperienceBySlug,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getExperiences);
router.get('/:slug', getExperienceBySlug);
router.post('/', protect, authorize('superadmin', 'admin', 'editor'), createExperience);
router.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), updateExperience);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteExperience);

module.exports = router;
