const { Op } = require('sequelize');
const { Enquiry, User } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { sendEnquiryNotification } = require('../services/mailer');
const { logAudit } = require('../services/auditService');

// @desc    Submit public enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, country, destination, travelDate, returnDate, travellers, budget, message, source } = req.body;

    if (!name || !email || !phone || !message) {
      return sendError(res, 'Please provide name, email, phone number, and message.', 400);
    }

    if (message.trim().length < 5) {
      return sendError(res, 'Message should be at least 5 characters.', 400);
    }

    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      country: country || '',
      destination: destination || '',
      travelDate: travelDate || '',
      returnDate: returnDate || '',
      travellers: travellers || '2 Adults',
      budget: budget || '',
      message: message.trim(),
      source: source || 'Website',
      status: 'new',
      notes: []
    });

    // Send email notification in background
    sendEnquiryNotification(enquiry).catch(err => console.error('Enquiry mailer error:', err));

    return sendSuccess(
      res,
      { id: enquiry.id },
      'Thank you. Our travel specialist will contact you shortly.',
      201
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/enquiries
// @access  Private (Admin/Superadmin)
const getEnquiries = async (req, res, next) => {
  try {
    const { status, destination, search, page = 1, limit = 50 } = req.query;
    const where = {};

    if (status) where.status = status;
    if (destination) where.destination = { [Op.like]: `%${destination}%` };
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { destination: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const { rows: enquiries, count: total } = await Enquiry.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'name', 'email']
        }
      ],
      limit: parseInt(limit, 10),
      offset,
      order: [['createdAt', 'DESC']]
    });

    return sendSuccess(res, {
      enquiries,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / parseInt(limit, 10))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private (Admin/Superadmin)
const getEnquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!enquiry) {
      return sendError(res, 'Enquiry not found', 404);
    }

    return sendSuccess(res, enquiry);
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status & assignment
// @route   PUT /api/enquiries/:id
// @access  Private (Admin/Superadmin)
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findByPk(id);
    if (!enquiry) {
      return sendError(res, 'Enquiry not found', 404);
    }

    const { status, assignedToId } = req.body;
    const oldStatus = enquiry.status;

    if (status) enquiry.status = status;
    if (assignedToId !== undefined) enquiry.assignedToId = assignedToId ? parseInt(assignedToId, 10) : null;

    await enquiry.save();

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_ENQUIRY_STATUS',
      entity: 'Enquiry',
      entityId: enquiry.id,
      ip: req.ip,
      metadata: { from: oldStatus, to: enquiry.status }
    });

    return sendSuccess(res, enquiry, 'Enquiry updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Add note to enquiry
// @route   POST /api/enquiries/:id/notes
// @access  Private (Admin/Superadmin)
const addEnquiryNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    if (!text || !text.trim()) {
      return sendError(res, 'Note content cannot be empty', 400);
    }

    const enquiry = await Enquiry.findByPk(id);
    if (!enquiry) {
      return sendError(res, 'Enquiry not found', 404);
    }

    const currentNotes = Array.isArray(enquiry.notes) ? enquiry.notes : [];
    const newNote = {
      id: Date.now().toString(),
      text: text.trim(),
      author: req.user?.name || 'Staff',
      authorId: req.user?.id,
      date: new Date().toISOString()
    };

    enquiry.notes = [newNote, ...currentNotes];
    await enquiry.save();

    return sendSuccess(res, enquiry, 'Note added successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Superadmin)
const deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findByPk(id);
    if (!enquiry) {
      return sendError(res, 'Enquiry not found', 404);
    }

    await enquiry.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_ENQUIRY',
      entity: 'Enquiry',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Enquiry deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  addEnquiryNote,
  deleteEnquiry
};
