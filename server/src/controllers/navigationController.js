const { Navigation } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { logAudit } = require('../services/auditService');

// @desc    Get navigation menus
// @route   GET /api/navigation
// @access  Public
const getNavigation = async (req, res, next) => {
  try {
    const { type } = req.query;
    const where = { status: 'active' };
    if (type) where.type = type;

    const items = await Navigation.findAll({
      where,
      order: [['orderIndex', 'ASC'], ['id', 'ASC']]
    });

    return sendSuccess(res, items);
  } catch (error) {
    next(error);
  }
};

// @desc    Create navigation item
// @route   POST /api/navigation
// @access  Private (Admin/Superadmin)
const createNavigationItem = async (req, res, next) => {
  try {
    const { label, url, parentId, type, orderIndex, status, openInNewTab, items } = req.body;
    if (!label || !url) {
      return sendError(res, 'Label and URL are required', 400);
    }

    const navItem = await Navigation.create({
      label,
      url,
      parentId: parentId ? parseInt(parentId, 10) : null,
      type: type || 'header',
      orderIndex: parseInt(orderIndex || 0, 10),
      status: status || 'active',
      openInNewTab: Boolean(openInNewTab),
      items: Array.isArray(items) ? items : []
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_NAV_ITEM',
      entity: 'Navigation',
      entityId: navItem.id,
      ip: req.ip
    });

    return sendSuccess(res, navItem, 'Navigation item created', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update navigation item
// @route   PUT /api/navigation/:id
// @access  Private (Admin/Superadmin)
const updateNavigationItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const navItem = await Navigation.findByPk(id);
    if (!navItem) {
      return sendError(res, 'Navigation item not found', 404);
    }

    const { label, url, parentId, type, orderIndex, status, openInNewTab, items } = req.body;
    if (label !== undefined) navItem.label = label;
    if (url !== undefined) navItem.url = url;
    if (parentId !== undefined) navItem.parentId = parentId ? parseInt(parentId, 10) : null;
    if (type !== undefined) navItem.type = type;
    if (orderIndex !== undefined) navItem.orderIndex = parseInt(orderIndex, 10);
    if (status !== undefined) navItem.status = status;
    if (openInNewTab !== undefined) navItem.openInNewTab = Boolean(openInNewTab);
    if (items !== undefined) navItem.items = Array.isArray(items) ? items : [];

    await navItem.save();

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_NAV_ITEM',
      entity: 'Navigation',
      entityId: navItem.id,
      ip: req.ip
    });

    return sendSuccess(res, navItem, 'Navigation item updated');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete navigation item
// @route   DELETE /api/navigation/:id
// @access  Private (Admin/Superadmin)
const deleteNavigationItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const navItem = await Navigation.findByPk(id);
    if (!navItem) {
      return sendError(res, 'Navigation item not found', 404);
    }

    await navItem.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_NAV_ITEM',
      entity: 'Navigation',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Navigation item deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNavigation,
  createNavigationItem,
  updateNavigationItem,
  deleteNavigationItem
};
