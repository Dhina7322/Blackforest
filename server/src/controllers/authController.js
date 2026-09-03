const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { logAudit } = require('../services/auditService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'blackforest_secret_key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendError(res, 'Please provide email and password', 400);
    }

    const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });
    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    if (user.status !== 'active') {
      return sendError(res, 'Account has been disabled. Please contact Super Admin.', 403);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const token = generateToken(user.id);

    await logAudit({
      userId: user.id,
      action: 'LOGIN',
      entity: 'User',
      entityId: user.id,
      ip: req.ip
    });

    return sendSuccess(res, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  return sendSuccess(res, {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    avatar: req.user.avatar,
    createdAt: req.user.createdAt
  });
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const user = req.user;
    if (name) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;
    await user.save();

    return sendSuccess(res, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }, 'Profile updated');
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return sendError(res, 'Both current and new password are required', 400);
    }

    const user = await User.findByPk(req.user.id);
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return sendError(res, 'Current password does not match', 400);
    }

    user.password = newPassword;
    await user.save();

    return sendSuccess(res, {}, 'Password updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    List all users (Superadmin only)
// @route   GET /api/auth/users
// @access  Private (Superadmin)
const listUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    return sendSuccess(res, users);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new user (Superadmin only)
// @route   POST /api/auth/users
// @access  Private (Superadmin)
const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return sendError(res, 'Name, email, and password are required', 400);
    }

    const existing = await User.findOne({ where: { email: email.toLowerCase().trim() } });
    if (existing) {
      return sendError(res, 'User with this email already exists', 409);
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password,
      role: role || 'editor'
    });

    await logAudit({
      userId: req.user.id,
      action: 'CREATE_USER',
      entity: 'User',
      entityId: newUser.id,
      ip: req.ip,
      metadata: { role: newUser.role, email: newUser.email }
    });

    return sendSuccess(res, {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }, 'User created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user (Superadmin only)
// @route   PUT /api/auth/users/:id
// @access  Private (Superadmin)
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role, status, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    if (name) user.name = name;
    if (role) user.role = role;
    if (status) user.status = status;
    if (password) user.password = password;

    await user.save();

    await logAudit({
      userId: req.user.id,
      action: 'UPDATE_USER',
      entity: 'User',
      entityId: user.id,
      ip: req.ip
    });

    return sendSuccess(res, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }, 'User updated');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (Superadmin only)
// @route   DELETE /api/auth/users/:id
// @access  Private (Superadmin)
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (parseInt(id, 10) === req.user.id) {
      return sendError(res, 'You cannot delete your own account', 400);
    }

    const user = await User.findByPk(id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    await user.destroy();
    return sendSuccess(res, {}, 'User deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getMe,
  updateProfile,
  updatePassword,
  listUsers,
  createUser,
  updateUser,
  deleteUser
};
