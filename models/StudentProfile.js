// models/StudentProfile.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const StudentProfile = sequelize.define('StudentProfile', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  class_name: {
    type: DataTypes.STRING
  },
  gpa: {
    type: DataTypes.DECIMAL(3, 2)
  }
}, {
  tableName: 'student_profiles',
  timestamps: false // Bảng này không có created_at
});

module.exports = StudentProfile;