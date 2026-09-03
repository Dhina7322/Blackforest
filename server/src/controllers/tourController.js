const { Op } = require('sequelize');
const { TourPackage, Destination } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { makeUniqueSlug } = require('../utils/slugify');
const { logAudit } = require('../services/auditService');

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
const getTours = async (req, res, next) => {
  try {
    const { category, destinationId, status, featured, region, search, page = 1, limit = 50 } = req.query;
    const where = {};

    if (category) where.category = category;
    if (destinationId) where.destinationId = destinationId;
    if (status) where.status = status;
    if (featured !== undefined) where.featured = featured === 'true';

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } },
        { shortDescription: { [Op.like]: `%${search}%` } }
      ];
    }

    const destinationInclude = {
      model: Destination,
      as: 'destination',
      attributes: ['id', 'name', 'slug', 'country', 'region']
    };

    if (region) {
      destinationInclude.where = { region };
    }

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const { rows: tours, count: total } = await TourPackage.findAndCountAll({
      where,
      include: [destinationInclude],
      limit: parseInt(limit, 10),
      offset,
      order: [
        ['featured', 'DESC'],
        ['createdAt', 'DESC']
      ]
    });

    return sendSuccess(res, {
      tours,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / parseInt(limit, 10))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single tour by slug
// @route   GET /api/tours/:slug
// @access  Public
const getTourBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const tour = await TourPackage.findOne({
      where: { slug },
      include: [
        {
          model: Destination,
          as: 'destination'
        }
      ]
    });

    if (!tour) {
      return sendError(res, 'Tour package not found', 404);
    }

    return sendSuccess(res, tour);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new tour
// @route   POST /api/tours
// @access  Private (Admin/Superadmin/Editor)
const createTour = async (req, res, next) => {
  try {
    const {
      title,
      slug: inputSlug,
      destinationId,
      category,
      type,
      duration,
      location,
      shortDescription,
      description,
      price,
      currency,
      discountPrice,
      rating,
      reviewCount,
      featured,
      coverImage,
      gallery,
      highlights,
      itinerary,
      inclusions,
      exclusions,
      terms,
      faq,
      status,
      seoTitle,
      seoDescription
    } = req.body;

    if (!title) {
      return sendError(res, 'Tour package title is required', 400);
    }

    const slug = await makeUniqueSlug(TourPackage, inputSlug || title);

    const tour = await TourPackage.create({
      title,
      slug,
      destinationId: destinationId ? parseInt(destinationId, 10) : null,
      category: category || 'international',
      type: type || 'Customized Tour',
      duration: duration || '5 Days / 4 Nights',
      location: location || '',
      shortDescription: shortDescription || '',
      description: description || '',
      price: price ? parseFloat(price) : 0,
      currency: currency || 'USD',
      discountPrice: discountPrice ? parseFloat(discountPrice) : null,
      rating: rating ? parseFloat(rating) : 4.9,
      reviewCount: reviewCount ? parseInt(reviewCount, 10) : 12,
      featured: Boolean(featured),
      coverImage: coverImage || '',
      gallery: Array.isArray(gallery) ? gallery : [],
      highlights: Array.isArray(highlights) ? highlights : [],
      itinerary: Array.isArray(itinerary) ? itinerary : [],
      inclusions: Array.isArray(inclusions) ? inclusions : [],
      exclusions: Array.isArray(exclusions) ? exclusions : [],
      terms: Array.isArray(terms) ? terms : [],
      faq: Array.isArray(faq) ? faq : [],
      status: status || 'published',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || shortDescription || ''
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_TOUR',
      entity: 'TourPackage',
      entityId: tour.id,
      ip: req.ip
    });

    return sendSuccess(res, tour, 'Tour package created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update tour
// @route   PUT /api/tours/:id
// @access  Private (Admin/Superadmin/Editor)
const updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await TourPackage.findByPk(id);
    if (!tour) {
      return sendError(res, 'Tour package not found', 404);
    }

    const {
      title,
      slug: inputSlug,
      destinationId,
      category,
      type,
      duration,
      location,
      shortDescription,
      description,
      price,
      currency,
      discountPrice,
      rating,
      reviewCount,
      featured,
      coverImage,
      gallery,
      highlights,
      itinerary,
      inclusions,
      exclusions,
      terms,
      faq,
      status,
      seoTitle,
      seoDescription
    } = req.body;

    if (title) tour.title = title;
    if (inputSlug && inputSlug !== tour.slug) {
      tour.slug = await makeUniqueSlug(TourPackage, inputSlug, tour.id);
    }
    if (destinationId !== undefined) tour.destinationId = destinationId ? parseInt(destinationId, 10) : null;
    if (category) tour.category = category;
    if (type !== undefined) tour.type = type;
    if (duration !== undefined) tour.duration = duration;
    if (location !== undefined) tour.location = location;
    if (shortDescription !== undefined) tour.shortDescription = shortDescription;
    if (description !== undefined) tour.description = description;
    if (price !== undefined) tour.price = parseFloat(price);
    if (currency !== undefined) tour.currency = currency;
    if (discountPrice !== undefined) tour.discountPrice = discountPrice ? parseFloat(discountPrice) : null;
    if (rating !== undefined) tour.rating = parseFloat(rating);
    if (reviewCount !== undefined) tour.reviewCount = parseInt(reviewCount, 10);
    if (featured !== undefined) tour.featured = Boolean(featured);
    if (coverImage !== undefined) tour.coverImage = coverImage;
    if (gallery !== undefined) tour.gallery = Array.isArray(gallery) ? gallery : [];
    if (highlights !== undefined) tour.highlights = Array.isArray(highlights) ? highlights : [];
    if (itinerary !== undefined) tour.itinerary = Array.isArray(itinerary) ? itinerary : [];
    if (inclusions !== undefined) tour.inclusions = Array.isArray(inclusions) ? inclusions : [];
    if (exclusions !== undefined) tour.exclusions = Array.isArray(exclusions) ? exclusions : [];
    if (terms !== undefined) tour.terms = Array.isArray(terms) ? terms : [];
    if (faq !== undefined) tour.faq = Array.isArray(faq) ? faq : [];
    if (status) tour.status = status;
    if (seoTitle !== undefined) tour.seoTitle = seoTitle;
    if (seoDescription !== undefined) tour.seoDescription = seoDescription;

    await tour.save();

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_TOUR',
      entity: 'TourPackage',
      entityId: tour.id,
      ip: req.ip
    });

    return sendSuccess(res, tour, 'Tour package updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Duplicate tour
// @route   POST /api/tours/:id/duplicate
// @access  Private (Admin/Superadmin/Editor)
const duplicateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sourceTour = await TourPackage.findByPk(id);
    if (!sourceTour) {
      return sendError(res, 'Source tour package not found', 404);
    }

    const data = sourceTour.toJSON();
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;

    data.title = `${data.title} (Copy)`;
    data.slug = await makeUniqueSlug(TourPackage, data.title);
    data.status = 'draft';

    const duplicated = await TourPackage.create(data);

    await logAudit({
      userId: req.user?.id,
      action: 'DUPLICATE_TOUR',
      entity: 'TourPackage',
      entityId: duplicated.id,
      ip: req.ip
    });

    return sendSuccess(res, duplicated, 'Tour package duplicated as draft', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete tour
// @route   DELETE /api/tours/:id
// @access  Private (Admin/Superadmin)
const deleteTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await TourPackage.findByPk(id);
    if (!tour) {
      return sendError(res, 'Tour package not found', 404);
    }

    await tour.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_TOUR',
      entity: 'TourPackage',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Tour package deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTours,
  getTourBySlug,
  createTour,
  updateTour,
  duplicateTour,
  deleteTour
};
