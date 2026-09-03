const { Testimonial } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { logAudit } = require('../services/auditService');

const getTestimonials = async (req, res, next) => {
  try {
    const { status, featured } = req.query;
    const where = {};
    if (status) where.status = status;
    if (featured !== undefined) where.featured = featured === 'true';

    const testimonials = await Testimonial.findAll({
      where,
      order: [
        ['featured', 'DESC'],
        ['orderIndex', 'ASC'],
        ['createdAt', 'DESC']
      ]
    });

    return sendSuccess(res, testimonials);
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const { name, designation, location, photo, rating, message, featured, orderIndex, status } = req.body;
    if (!name || !message) {
      return sendError(res, 'Name and message are required', 400);
    }

    const testimonial = await Testimonial.create({
      name,
      designation: designation || 'Traveler',
      location: location || '',
      photo: photo || '',
      rating: rating ? parseFloat(rating) : 5.0,
      message,
      featured: featured !== undefined ? Boolean(featured) : true,
      orderIndex: parseInt(orderIndex || 0, 10),
      status: status || 'published'
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_TESTIMONIAL',
      entity: 'Testimonial',
      entityId: testimonial.id,
      ip: req.ip
    });

    return sendSuccess(res, testimonial, 'Testimonial created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return sendError(res, 'Testimonial not found', 404);
    }

    const { name, designation, location, photo, rating, message, featured, orderIndex, status } = req.body;
    if (name) testimonial.name = name;
    if (designation !== undefined) testimonial.designation = designation;
    if (location !== undefined) testimonial.location = location;
    if (photo !== undefined) testimonial.photo = photo;
    if (rating !== undefined) testimonial.rating = parseFloat(rating);
    if (message !== undefined) testimonial.message = message;
    if (featured !== undefined) testimonial.featured = Boolean(featured);
    if (orderIndex !== undefined) testimonial.orderIndex = parseInt(orderIndex, 10);
    if (status) testimonial.status = status;

    await testimonial.save();

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_TESTIMONIAL',
      entity: 'Testimonial',
      entityId: testimonial.id,
      ip: req.ip
    });

    return sendSuccess(res, testimonial, 'Testimonial updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return sendError(res, 'Testimonial not found', 404);
    }

    await testimonial.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_TESTIMONIAL',
      entity: 'Testimonial',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Testimonial deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
