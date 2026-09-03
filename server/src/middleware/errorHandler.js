const { sendError } = require('../utils/apiResponse');

const notFound = (req, res, next) => {
  sendError(res, `Route not found: ${req.originalUrl}`, 404);
};

const errorHandler = (err, req, res, next) => {
  console.error('API Error:', err);

  // Sequelize Unique Constraint Error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors?.[0]?.path || 'Field';
    return sendError(res, `${field} must be unique. A record with this ${field} already exists.`, 409);
  }

  // Sequelize Validation Error
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    return sendError(res, 'Validation error: ' + messages.join(', '), 422, messages);
  }

  // Multer File Upload Error
  if (err.name === 'MulterError') {
    return sendError(res, `File upload error: ${err.message}`, 400);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return sendError(res, 'Invalid or expired token', 401);
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  return sendError(res, err.message || 'Internal Server Error', statusCode);
};

module.exports = { notFound, errorHandler };
