const path = require('path');
const fs = require('fs');
const { Media } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { logAudit } = require('../services/auditService');

// @desc    Upload media file
// @route   POST /api/media/upload
// @access  Private (Admin/Superadmin/Editor)
const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No file uploaded', 400);
    }

    const file = req.file;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${file.filename}`;

    const media = await Media.create({
      filename: file.filename,
      url: fileUrl,
      alt: req.body.alt || path.parse(file.originalname).name,
      size: file.size,
      mimeType: file.mimetype,
      uploadedById: req.user?.id || null
    });

    await logAudit({
      userId: req.user?.id,
      action: 'UPLOAD_MEDIA',
      entity: 'Media',
      entityId: media.id,
      ip: req.ip
    });

    return sendSuccess(res, media, 'File uploaded successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get media files
// @route   GET /api/media
// @access  Private (Admin/Superadmin/Editor)
const getMediaList = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, search } = req.query;
    const where = {};

    if (search) {
      const { Op } = require('sequelize');
      where.filename = { [Op.like]: `%${search}%` };
    }

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const { rows: media, count: total } = await Media.findAndCountAll({
      where,
      limit: parseInt(limit, 10),
      offset,
      order: [['createdAt', 'DESC']]
    });

    return sendSuccess(res, {
      media,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / parseInt(limit, 10))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private (Admin/Superadmin)
const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const media = await Media.findByPk(id);
    if (!media) {
      return sendError(res, 'Media not found', 404);
    }

    const filePath = path.join(__dirname, '../../uploads', media.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.warn('Could not delete physical file:', e.message);
      }
    }

    await media.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_MEDIA',
      entity: 'Media',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Media deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadMedia,
  getMediaList,
  deleteMedia
};
