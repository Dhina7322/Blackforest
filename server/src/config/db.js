const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const socketPath = process.env.DB_SOCKET || '/tmp/mysql.sock';
const socketExists = fs.existsSync(socketPath);

const dialectOptions = {};
if (socketExists) {
  dialectOptions.socketPath = socketPath;
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'blackforest',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root123',
  {
    dialect: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialectOptions,
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ MySQL connected successfully via ${socketExists ? 'Socket (' + socketPath + ')' : 'TCP'}`);
    await sequelize.sync({ alter: false });
    console.log('✅ MySQL models synchronized');
  } catch (error) {
    console.error('❌ MySQL Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
