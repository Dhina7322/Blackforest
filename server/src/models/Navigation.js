const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Navigation = sequelize.define('Navigation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('header', 'footer', 'dropdown', 'megamenu'),
    defaultValue: 'header'
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  openInNewTab: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  items: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['type'] },
    { fields: ['orderIndex'] }
  ]
});

module.exports = Navigation;
