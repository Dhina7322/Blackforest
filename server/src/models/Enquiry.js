const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Enquiry = sequelize.define('Enquiry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  destination: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  travelDate: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  returnDate: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  travellers: {
    type: DataTypes.STRING,
    defaultValue: '2 Adults'
  },
  budget: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  source: {
    type: DataTypes.STRING,
    defaultValue: 'Website'
  },
  status: {
    type: DataTypes.ENUM(
      'new',
      'contacted',
      'in_progress',
      'qualified',
      'converted',
      'closed',
      'spam'
    ),
    defaultValue: 'new'
  },
  assignedToId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  notes: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['status'] },
    { fields: ['createdAt'] }
  ]
});

module.exports = Enquiry;
