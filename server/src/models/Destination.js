const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Destination = sequelize.define('Destination', {
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
  country: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  region: {
    type: DataTypes.ENUM(
      'africa',
      'america',
      'asian-countries',
      'australia',
      'europe',
      'indian-ocean',
      'middle-east',
      'south-asia',
      'india'
    ),
    defaultValue: 'europe'
  },
  shortDescription: {
    type: DataTypes.STRING(500),
    defaultValue: ''
  },
  description: {
    type: DataTypes.TEXT,
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
  gallery: {
    type: DataTypes.JSON,
    defaultValue: []
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
    { fields: ['region'] },
    { fields: ['status'] },
    { fields: ['featured'] }
  ]
});

module.exports = Destination;
