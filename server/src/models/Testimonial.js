const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  designation: {
    type: DataTypes.STRING,
    defaultValue: 'Traveler'
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  photo: {
    type: DataTypes.STRING(1000),
    defaultValue: ''
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
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
    { fields: ['status'] },
    { fields: ['featured'] },
    { fields: ['orderIndex'] }
  ]
});

module.exports = Testimonial;
