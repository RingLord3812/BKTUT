// models/TutorProfile.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TutorProfile = sequelize.define('TutorProfile', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  is_faculty: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  position: {
    type: DataTypes.STRING
  },
  specialty: {
    type: DataTypes.STRING
  },
  class_name: {
    type: DataTypes.STRING
  },
  gpa: {
    type: DataTypes.DECIMAL(3, 2)
  }
}, {
  tableName: 'tutor_profiles',
  timestamps: false
});

module.exports = TutorProfile;