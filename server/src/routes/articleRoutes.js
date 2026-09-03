const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getArticles);
router.get('/:slug', getArticleBySlug);
router.post('/', protect, authorize('superadmin', 'admin', 'editor'), createArticle);
router.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), updateArticle);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteArticle);

module.exports = router;
