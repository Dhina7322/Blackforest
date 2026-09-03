const { Service } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { makeUniqueSlug } = require('../utils/slugify');
const { logAudit } = require('../services/auditService');

const getServices = async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;

    const services = await Service.findAll({
      where,
      order: [['orderIndex', 'ASC'], ['id', 'ASC']]
    });

    return sendSuccess(res, services);
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const { title, slug: inputSlug, description, icon, image, link, featured, orderIndex, status } = req.body;
    if (!title) {
      return sendError(res, 'Service title is required', 400);
    }

    const slug = await makeUniqueSlug(Service, inputSlug || title);
    const service = await Service.create({
      title,
      slug,
      description: description || '',
      icon: icon || 'Compass',
      image: image || '',
      link: link || '',
      featured: featured !== undefined ? Boolean(featured) : true,
      orderIndex: parseInt(orderIndex || 0, 10),
      status: status || 'published'
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_SERVICE',
      entity: 'Service',
      entityId: service.id,
      ip: req.ip
    });

    return sendSuccess(res, service, 'Service created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    const { title, slug: inputSlug, description, icon, image, link, featured, orderIndex, status } = req.body;
    if (title) service.title = title;
    if (inputSlug && inputSlug !== service.slug) {
      service.slug = await makeUniqueSlug(Service, inputSlug, service.id);
    }
    if (description !== undefined) service.description = description;
    if (icon !== undefined) service.icon = icon;
    if (image !== undefined) service.image = image;
    if (link !== undefined) service.link = link;
    if (featured !== undefined) service.featured = Boolean(featured);
    if (orderIndex !== undefined) service.orderIndex = parseInt(orderIndex, 10);
    if (status) service.status = status;

    await service.save();

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_SERVICE',
      entity: 'Service',
      entityId: service.id,
      ip: req.ip
    });

    return sendSuccess(res, service, 'Service updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    await service.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_SERVICE',
      entity: 'Service',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService
};
