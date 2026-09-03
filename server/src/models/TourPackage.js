const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TourPackage = sequelize.define('TourPackage', {
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
  destinationId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('international', 'india'),
    defaultValue: 'international'
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'Customized Tour'
  },
  duration: {
    type: DataTypes.STRING,
    defaultValue: '5 Days / 4 Nights'
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  shortDescription: {
    type: DataTypes.STRING(1000),
    defaultValue: ''
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'USD'
  },
  discountPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 4.9
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 15
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  coverImage: {
    type: DataTypes.STRING(1000),
    defaultValue: ''
  },
  gallery: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  highlights: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  itinerary: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  inclusions: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  exclusions: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  terms: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  faq: {
    type: DataTypes.JSON,
    defaultValue: []
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
    { fields: ['destinationId'] },
    { fields: ['status'] },
    { fields: ['featured'] }
  ]
});

module.exports = TourPackage;
