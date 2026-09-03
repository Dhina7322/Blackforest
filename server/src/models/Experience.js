const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Experience = sequelize.define('Experience', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  category: {
    type: DataTypes.ENUM(
      'adventure-nature',
      'island-holidays',
      'family-holidays',
      'honeymoon-escapes',
      'luxury-escapes'
    ),
    defaultValue: 'adventure-nature'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  heroImage: {
    type: DataTypes.STRING(1000),
    defaultValue: ''
  },
  thumbnail: {
    type: DataTypes.STRING(1000),
    defaultValue: ''
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('published', 'draft'),
    defaultValue: 'published'
  },
  seoTitle: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  seoDescription: {
    type: DataTypes.STRING(1000),
    defaultValue: ''
  }
}, {
  timestamps: true,
  indexes: [
    { unique: true, fields: ['slug'] },
    { fields: ['category'] },
    { fields: ['status'] },
    { fields: ['featured'] }
  ]
});

module.exports = Experience;
