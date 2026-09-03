const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  uploadMedia,
  getMediaList,
  deleteMedia
} = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/upload', protect, authorize('superadmin', 'admin', 'editor'), upload.single('file'), uploadMedia);
router.get('/', protect, authorize('superadmin', 'admin', 'editor'), getMediaList);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteMedia);

module.exports = router;
