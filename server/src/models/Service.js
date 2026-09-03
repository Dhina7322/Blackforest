const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: 'Compass'
  },
  image: {
    type: DataTypes.STRING(1000),
    defaultValue: ''
  },
  link: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
    { unique: true, fields: ['slug'] },
    { fields: ['status'] },
    { fields: ['orderIndex'] }
  ]
});

module.exports = Service;
