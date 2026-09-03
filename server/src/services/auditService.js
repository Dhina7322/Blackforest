const AuditLog = require('../models/AuditLog');

const logAudit = async ({ userId = null, action, entity, entityId = '', ip = '', metadata = {} }) => {
  try {
    await AuditLog.create({
      userId,
      action,
      entity,
      entityId: String(entityId),
      ip,
      metadata
    });
  } catch (err) {
    console.error('AuditLog Error:', err.message);
  }
};

module.exports = { logAudit };
