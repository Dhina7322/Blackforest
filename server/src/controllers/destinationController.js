const { Op } = require('sequelize');
const { Destination, TourPackage } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { makeUniqueSlug } = require('../utils/slugify');
const { logAudit } = require('../services/auditService');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
const getDestinations = async (req, res, next) => {
  try {
    const { region, status, featured, search, page = 1, limit = 50 } = req.query;
    const where = {};

    if (region) where.region = region;
    if (status) where.status = status;
    if (featured !== undefined) where.featured = featured === 'true';
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { country: { [Op.like]: `%${search}%` } },
        { shortDescription: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const { rows: destinations, count: total } = await Destination.findAndCountAll({
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
      destinations,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / parseInt(limit, 10))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single destination by slug
// @route   GET /api/destinations/:slug
// @access  Public
const getDestinationBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const destination = await Destination.findOne({
      where: { slug },
      include: [
        {
          model: TourPackage,
          as: 'packages',
          where: { status: 'published' },
          required: false
        }
      ]
    });

    if (!destination) {
      return sendError(res, 'Destination not found', 404);
    }

    return sendSuccess(res, destination);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new destination
// @route   POST /api/destinations
// @access  Private (Admin/Superadmin/Editor)
const createDestination = async (req, res, next) => {
  try {
    const { name, slug: inputSlug, country, region, shortDescription, description, heroImage, thumbnail, gallery, featured, orderIndex, status, seoTitle, seoDescription } = req.body;

    if (!name) {
      return sendError(res, 'Destination name is required', 400);
    }

    const slug = await makeUniqueSlug(Destination, inputSlug || name);

    const destination = await Destination.create({
      name,
      slug,
      country: country || '',
      region: region || 'europe',
      shortDescription: shortDescription || '',
      description: description || '',
      heroImage: heroImage || '',
      thumbnail: thumbnail || '',
      gallery: Array.isArray(gallery) ? gallery : [],
      featured: Boolean(featured),
      orderIndex: parseInt(orderIndex || 0, 10),
      status: status || 'published',
      seoTitle: seoTitle || name,
      seoDescription: seoDescription || shortDescription || ''
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_DESTINATION',
      entity: 'Destination',
      entityId: destination.id,
      ip: req.ip
    });

    return sendSuccess(res, destination, 'Destination created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private (Admin/Superadmin/Editor)
const updateDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findByPk(id);
    if (!destination) {
      return sendError(res, 'Destination not found', 404);
    }

    const { name, slug: inputSlug, country, region, shortDescription, description, heroImage, thumbnail, gallery, featured, orderIndex, status, seoTitle, seoDescription } = req.body;

    if (name) destination.name = name;
    if (inputSlug && inputSlug !== destination.slug) {
      destination.slug = await makeUniqueSlug(Destination, inputSlug, destination.id);
    }
    if (country !== undefined) destination.country = country;
    if (region) destination.region = region;
    if (shortDescription !== undefined) destination.shortDescription = shortDescription;
    if (description !== undefined) destination.description = description;
    if (heroImage !== undefined) destination.heroImage = heroImage;
    if (thumbnail !== undefined) destination.thumbnail = thumbnail;
    if (gallery !== undefined) destination.gallery = Array.isArray(gallery) ? gallery : [];
    if (featured !== undefined) destination.featured = Boolean(featured);
    if (orderIndex !== undefined) destination.orderIndex = parseInt(orderIndex, 10);
    if (status) destination.status = status;
    if (seoTitle !== undefined) destination.seoTitle = seoTitle;
    if (seoDescription !== undefined) destination.seoDescription = seoDescription;

    await destination.save();

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_DESTINATION',
      entity: 'Destination',
      entityId: destination.id,
      ip: req.ip
    });

    return sendSuccess(res, destination, 'Destination updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private (Admin/Superadmin)
const deleteDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findByPk(id);
    if (!destination) {
      return sendError(res, 'Destination not found', 404);
    }

    await destination.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_DESTINATION',
      entity: 'Destination',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Destination deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination
};
