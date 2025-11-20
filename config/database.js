// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Đọc các biến từ file .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // Bật log để xem câu lệnh SQL (tắt khi deploy)
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Cần thiết cho Azure MySQL
      }
    }
  }
);

// Hàm để kiểm tra kết nối
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ [Database] Connection has been established successfully.');
  } catch (error) {
    console.error('❌ [Database] Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };