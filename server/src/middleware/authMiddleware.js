const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Not authorized, no token provided', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'blackforest_secret_key');
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user || user.status !== 'active') {
      return sendError(res, 'User account not found or deactivated', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Token is invalid or expired', 401);
  }
};

module.exports = { protect };
