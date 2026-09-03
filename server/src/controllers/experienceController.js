const { Op } = require('sequelize');
const { Experience } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { makeUniqueSlug } = require('../utils/slugify');
const { logAudit } = require('../services/auditService');

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
const getExperiences = async (req, res, next) => {
  try {
    const { category, status, featured, search, page = 1, limit = 50 } = req.query;
    const where = {};

    if (category) where.category = category;
    if (status) where.status = status;
    if (featured !== undefined) where.featured = featured === 'true';
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const { rows: experiences, count: total } = await Experience.findAndCountAll({
      where,
      limit: parseInt(limit, 10),
      offset,
      order: [
        ['featured', 'DESC'],
        ['orderIndex', 'ASC'],
        ['name', 'ASC']
      ]
    });

    return sendSuccess(res, {
      experiences,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / parseInt(limit, 10))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get experience by slug
// @route   GET /api/experiences/:slug
// @access  Public
const getExperienceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const experience = await Experience.findOne({ where: { slug } });
    if (!experience) {
      return sendError(res, 'Experience not found', 404);
    }
    return sendSuccess(res, experience);
  } catch (error) {
    next(error);
  }
};

// @desc    Create experience
// @route   POST /api/experiences
// @access  Private (Admin/Superadmin/Editor)
const createExperience = async (req, res, next) => {
  try {
    const { name, slug: inputSlug, category, description, content, heroImage, thumbnail, featured, orderIndex, status, seoTitle, seoDescription } = req.body;

    if (!name) {
      return sendError(res, 'Experience name is required', 400);
    }

    const slug = await makeUniqueSlug(Experience, inputSlug || name);

    const experience = await Experience.create({
      name,
      slug,
      category: category || 'adventure-nature',
      description: description || '',
      content: content || '',
      heroImage: heroImage || '',
      thumbnail: thumbnail || '',
      featured: Boolean(featured),
      orderIndex: parseInt(orderIndex || 0, 10),
      status: status || 'published',
      seoTitle: seoTitle || name,
      seoDescription: seoDescription || description || ''
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_EXPERIENCE',
      entity: 'Experience',
      entityId: experience.id,
      ip: req.ip
    });

    return sendSuccess(res, experience, 'Experience created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience
// @route   PUT /api/experiences/:id
// @access  Private (Admin/Superadmin/Editor)
const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByPk(id);
    if (!experience) {
      return sendError(res, 'Experience not found', 404);
    }

    const { name, slug: inputSlug, category, description, content, heroImage, thumbnail, featured, orderIndex, status, seoTitle, seoDescription } = req.body;

    if (name) experience.name = name;
    if (inputSlug && inputSlug !== experience.slug) {
      experience.slug = await makeUniqueSlug(Experience, inputSlug, experience.id);
    }
    if (category) experience.category = category;
    if (description !== undefined) experience.description = description;
    if (content !== undefined) experience.content = content;
    if (heroImage !== undefined) experience.heroImage = heroImage;
    if (thumbnail !== undefined) experience.thumbnail = thumbnail;
    if (featured !== undefined) experience.featured = Boolean(featured);
    if (orderIndex !== undefined) experience.orderIndex = parseInt(orderIndex, 10);
    if (status) experience.status = status;
    if (seoTitle !== undefined) experience.seoTitle = seoTitle;
    if (seoDescription !== undefined) experience.seoDescription = seoDescription;

    await experience.save();

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_EXPERIENCE',
      entity: 'Experience',
      entityId: experience.id,
      ip: req.ip
    });

    return sendSuccess(res, experience, 'Experience updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Private (Admin/Superadmin)
const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByPk(id);
    if (!experience) {
      return sendError(res, 'Experience not found', 404);
    }

    await experience.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_EXPERIENCE',
      entity: 'Experience',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Experience deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperiences,
  getExperienceBySlug,
  createExperience,
  updateExperience,
  deleteExperience
};
