const { Expertise } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { logAudit } = require('../services/auditService');

const getExpertise = async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;

    const items = await Expertise.findAll({
      where,
      order: [['orderIndex', 'ASC'], ['id', 'ASC']]
    });

    return sendSuccess(res, items);
  } catch (error) {
    next(error);
  }
};

const createExpertise = async (req, res, next) => {
  try {
    const { name, logo, description, link, orderIndex, status } = req.body;
    if (!name) {
      return sendError(res, 'Name is required', 400);
    }

    const item = await Expertise.create({
      name,
      logo: logo || '',
      description: description || '',
      link: link || '',
      orderIndex: parseInt(orderIndex || 0, 10),
      status: status || 'published'
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_EXPERTISE',
      entity: 'Expertise',
      entityId: item.id,
      ip: req.ip
    });

    return sendSuccess(res, item, 'Expertise created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateExpertise = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Expertise.findByPk(id);
    if (!item) {
      return sendError(res, 'Expertise record not found', 404);
    }

    const { name, logo, description, link, orderIndex, status } = req.body;
    if (name) item.name = name;
    if (logo !== undefined) item.logo = logo;
    if (description !== undefined) item.description = description;
    if (link !== undefined) item.link = link;
    if (orderIndex !== undefined) item.orderIndex = parseInt(orderIndex, 10);
    if (status) item.status = status;

    await item.save();

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_EXPERTISE',
      entity: 'Expertise',
      entityId: item.id,
      ip: req.ip
    });

    return sendSuccess(res, item, 'Expertise updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteExpertise = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Expertise.findByPk(id);
    if (!item) {
      return sendError(res, 'Expertise record not found', 404);
    }

    await item.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_EXPERTISE',
      entity: 'Expertise',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Expertise deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExpertise,
  createExpertise,
  updateExpertise,
  deleteExpertise
};
