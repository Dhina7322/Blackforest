const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Expertise = sequelize.define('Expertise', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING(1000),
    defaultValue: ''
  },
  description: {
    type: DataTypes.STRING(500),
    defaultValue: ''
  },
  link: {
    type: DataTypes.STRING(500),
    defaultValue: ''
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('published', 'draft'),
    defaultValue: 'published'
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['status'] },
    { fields: ['orderIndex'] }
  ]
});

module.exports = Expertise;
