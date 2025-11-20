// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone_num: {
    type: DataTypes.STRING
  },
  // Lưu ý: Trong thực tế không nên trả về password, nhưng ở Model ta vẫn phải khai báo
  hashed_password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users', // Tên bảng trong MySQL
  timestamps: true,   // Sử dụng created_at, updated_at
  createdAt: 'created_at', // Map field created_at của SQL
  updatedAt: false    // Bảng của bạn không có updated_at nên để false
});

module.exports = User;